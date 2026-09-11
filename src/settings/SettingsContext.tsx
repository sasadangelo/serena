import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CategoryId } from "../theme/theme";

export interface MusicVolumes {
  sonno: number;
  focus: number;
  ansia: number;
}

interface SettingsContextValue {
  loaded: boolean;
  voiceVolume: number;
  musicVolumes: MusicVolumes;
  setVoiceVolume: (value: number) => void;
  setMusicVolume: (category: CategoryId, value: number) => void;
}

const DEFAULT_VOICE_VOLUME = 1;
const DEFAULT_MUSIC_VOLUMES: MusicVolumes = { sonno: 0.5, focus: 0.5, ansia: 0.5 };
const STORAGE_KEY = "serena.settings.v1";

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [voiceVolume, setVoiceVolumeState] = useState(DEFAULT_VOICE_VOLUME);
  const [musicVolumes, setMusicVolumesState] = useState<MusicVolumes>(DEFAULT_MUSIC_VOLUMES);
  const hydrating = useRef(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          const parsed = JSON.parse(raw);
          if (typeof parsed.voiceVolume === "number") setVoiceVolumeState(parsed.voiceVolume);
          if (parsed.musicVolumes) {
            setMusicVolumesState({ ...DEFAULT_MUSIC_VOLUMES, ...parsed.musicVolumes });
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        hydrating.current = false;
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (hydrating.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ voiceVolume, musicVolumes })).catch(() => {});
  }, [voiceVolume, musicVolumes]);

  const value = useMemo<SettingsContextValue>(
    () => ({
      loaded,
      voiceVolume,
      musicVolumes,
      setVoiceVolume: setVoiceVolumeState,
      setMusicVolume: (category, val) =>
        setMusicVolumesState((prev) => ({ ...prev, [category]: val })),
    }),
    [loaded, voiceVolume, musicVolumes]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within a SettingsProvider");
  return ctx;
}
