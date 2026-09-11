import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BreathingOrb } from "../components/BreathingOrb";
import { ambientSources } from "../audio/ambientSources";
import { useMeditationSession } from "../audio/useMeditationSession";
import { estimateDurationSec, meditationScripts } from "../content/scripts";
import { categoryThemes, spacing } from "../theme/theme";
import { useSettings } from "../settings/SettingsContext";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Player">;

function formatTime(totalSec: number): string {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PlayerScreen({ route, navigation }: Props) {
  const { categoryId } = route.params;
  const script = meditationScripts[categoryId];
  const theme = categoryThemes[categoryId];
  const estimatedSec = useMemo(() => Math.min(estimateDurationSec(script), 300), [script]);
  const { voiceVolume, musicVolumes } = useSettings();

  const { status, elapsedSec, currentLineText, start, stop } = useMeditationSession(
    script,
    ambientSources[categoryId],
    musicVolumes[categoryId],
    voiceVolume
  );

  const progress = Math.min(elapsedSec / estimatedSec, 1);
  const isPlaying = status === "playing";
  const isCompleted = status === "completed";

  const handleClose = () => {
    stop();
    navigation.goBack();
  };

  return (
    <LinearGradient colors={theme.gradient} style={styles.flex} start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }}>
      <SafeAreaView style={styles.flex}>
        <View style={styles.header}>
          <Pressable onPress={handleClose} hitSlop={12} style={styles.iconButton}>
            <Ionicons name="chevron-back" size={26} color={theme.textOnGradient} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: theme.textOnGradient }]}>{script.title}</Text>
          <View style={styles.iconButton} />
        </View>

        <View style={styles.center}>
          <BreathingOrb color={theme.accent} active={isPlaying} />

          <Text style={[styles.timer, { color: theme.textOnGradient }]}>
            {isCompleted ? "Completato" : formatTime(elapsedSec)}
          </Text>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${(isCompleted ? 1 : progress) * 100}%`, backgroundColor: theme.accent },
              ]}
            />
          </View>

          <Text style={[styles.line, { color: theme.textOnGradient }]} numberOfLines={3}>
            {isCompleted
              ? "Porta con te questa calma. A presto."
              : currentLineText ?? script.subtitle}
          </Text>
        </View>

        <View style={styles.controls}>
          {isCompleted ? (
            <Pressable
              onPress={start}
              style={[styles.primaryButton, { backgroundColor: theme.accent }]}
            >
              <Ionicons name="refresh" size={22} color="#111116" />
              <Text style={styles.primaryButtonText}>Ricomincia</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={isPlaying ? stop : start}
              style={[styles.primaryButton, { backgroundColor: theme.accent }]}
            >
              <Ionicons name={isPlaying ? "stop" : "play"} size={22} color="#111116" />
              <Text style={styles.primaryButtonText}>{isPlaying ? "Interrompi" : "Inizia"}</Text>
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  timer: {
    fontSize: 32,
    fontWeight: "300",
    marginTop: spacing.xl,
    fontVariant: ["tabular-nums"],
  },
  progressTrack: {
    width: "70%",
    height: 3,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginTop: spacing.md,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  line: {
    marginTop: spacing.xl,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    opacity: 0.9,
    minHeight: 72,
  },
  controls: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: 999,
  },
  primaryButtonText: {
    color: "#111116",
    fontSize: 16,
    fontWeight: "700",
  },
});
