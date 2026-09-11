import { useCallback, useEffect, useRef, useState } from "react";
import { useAudioPlayer, setAudioModeAsync } from "expo-audio";
import * as Speech from "expo-speech";
import { MeditationScript } from "../content/scripts";

export type SessionStatus = "idle" | "playing" | "completed";

const MAX_DURATION_SEC = 300; // hard cap requested: audio never exceeds 5 minutes

export function useMeditationSession(
  script: MeditationScript,
  ambientSource: number,
  musicVolume: number,
  voiceVolume: number
) {
  const player = useAudioPlayer(ambientSource);
  const [status, setStatus] = useState<SessionStatus>("idle");
  const [elapsedSec, setElapsedSec] = useState(0);
  const [lineIndex, setLineIndex] = useState(-1);

  const elapsedTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeRef = useRef(false);
  const statusRef = useRef<SessionStatus>(status);
  const musicVolumeRef = useRef(musicVolume);
  const voiceVolumeRef = useRef(voiceVolume);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    voiceVolumeRef.current = voiceVolume;
  }, [voiceVolume]);

  useEffect(() => {
    musicVolumeRef.current = musicVolume;
    // Live-adjust an already-playing session without waiting for a restart.
    if (statusRef.current === "playing") {
      player.volume = musicVolume;
    }
  }, [musicVolume, player]);

  const clearElapsedTimer = useCallback(() => {
    if (elapsedTimerRef.current) {
      clearInterval(elapsedTimerRef.current);
      elapsedTimerRef.current = null;
    }
  }, []);

  const clearPauseTimeout = useCallback(() => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
  }, []);

  const fadeVolume = useCallback(
    (to: number, durationMs: number) => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      const steps = 12;
      const from = player.volume;
      let step = 0;
      const stepMs = durationMs / steps;
      fadeIntervalRef.current = setInterval(() => {
        step += 1;
        player.volume = from + (to - from) * (step / steps);
        if (step >= steps && fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
      }, stepMs);
    },
    [player]
  );

  useEffect(() => {
    player.loop = true;
    player.volume = 0;
    // Without this, the ambient loop grabs exclusive audio focus and the
    // system TTS voice (a separate audio stream) never becomes audible.
    setAudioModeAsync({ interruptionMode: "mixWithOthers" });
    return () => {
      activeRef.current = false;
      clearElapsedTimer();
      clearPauseTimeout();
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      Speech.stop();
      // Don't touch `player` here: expo-audio's own unmount effect (registered
      // before this one via useAudioPlayer) already released the native
      // shared object by the time this cleanup runs.
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finishSession = useCallback(() => {
    activeRef.current = false;
    clearElapsedTimer();
    clearPauseTimeout();
    Speech.stop();
    fadeVolume(0, 2500);
    setStatus("completed");
  }, [clearElapsedTimer, clearPauseTimeout, fadeVolume]);

  useEffect(() => {
    if (status === "playing" && elapsedSec >= MAX_DURATION_SEC) {
      finishSession();
    }
  }, [elapsedSec, status, finishSession]);

  const speakLine = useCallback(
    (index: number) => {
      if (!activeRef.current) return;
      if (index >= script.lines.length) {
        finishSession();
        return;
      }
      setLineIndex(index);
      const line = script.lines[index];

      let settled = false;
      const advance = (delayMs: number) => {
        if (settled || !activeRef.current) return;
        settled = true;
        pauseTimeoutRef.current = setTimeout(() => speakLine(index + 1), delayMs);
      };

      // Safety net: if the TTS engine never fires onDone/onError (e.g. a
      // missing voice pack silently swallows the utterance), don't leave the
      // session frozen in silence on this line forever.
      const words = line.text.split(/\s+/).filter(Boolean).length;
      const watchdogMs = (words / 1.2) * 1000 + 6000;
      const watchdogId = setTimeout(() => advance(0), watchdogMs);

      Speech.speak(line.text, {
        language: "it-IT",
        pitch: 1.0,
        rate: 0.86,
        volume: voiceVolumeRef.current,
        onDone: () => {
          clearTimeout(watchdogId);
          advance(line.pauseAfterMs);
        },
        onStopped: () => {
          clearTimeout(watchdogId);
        },
        onError: () => {
          clearTimeout(watchdogId);
          advance(500);
        },
      });
    },
    [script, finishSession]
  );

  const start = useCallback(() => {
    activeRef.current = true;
    setElapsedSec(0);
    setLineIndex(-1);
    setStatus("playing");
    player.play();
    fadeVolume(musicVolumeRef.current, 2000);
    elapsedTimerRef.current = setInterval(() => {
      setElapsedSec((s) => s + 1);
    }, 1000);
    speakLine(0);
  }, [player, fadeVolume, speakLine]);

  const stop = useCallback(() => {
    activeRef.current = false;
    clearElapsedTimer();
    clearPauseTimeout();
    Speech.stop();
    fadeVolume(0, 800);
    setStatus("idle");
    setElapsedSec(0);
    setLineIndex(-1);
  }, [clearElapsedTimer, clearPauseTimeout, fadeVolume]);

  return {
    status,
    elapsedSec,
    lineIndex,
    currentLineText: lineIndex >= 0 ? script.lines[lineIndex]?.text ?? null : null,
    start,
    stop,
    maxDurationSec: MAX_DURATION_SEC,
  };
}
