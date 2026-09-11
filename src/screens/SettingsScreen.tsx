import React from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VolumeSlider } from "../components/VolumeSlider";
import { useSettings } from "../settings/SettingsContext";
import { categoryThemes, palette, spacing } from "../theme/theme";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

export function SettingsScreen({ navigation }: Props) {
  const { voiceVolume, musicVolumes, setVoiceVolume, setMusicVolume } = useSettings();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={palette.background} />
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={26} color={palette.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Impostazioni</Text>
        <View style={styles.iconButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Voce</Text>
        <VolumeSlider
          label="Voce guida"
          icon="mic-outline"
          accent={palette.textPrimary}
          value={voiceVolume}
          onValueChange={setVoiceVolume}
        />

        <Text style={styles.sectionTitle}>Musica di sottofondo</Text>
        <VolumeSlider
          label="Sonno"
          icon="moon"
          accent={categoryThemes.sonno.accent}
          value={musicVolumes.sonno}
          onValueChange={(v) => setMusicVolume("sonno", v)}
        />
        <VolumeSlider
          label="Focus"
          icon="locate"
          accent={categoryThemes.focus.accent}
          value={musicVolumes.focus}
          onValueChange={(v) => setMusicVolume("focus", v)}
        />
        <VolumeSlider
          label="Ansia"
          icon="leaf"
          accent={categoryThemes.ansia.accent}
          value={musicVolumes.ansia}
          onValueChange={(v) => setMusicVolume("ansia", v)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
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
    color: palette.textPrimary,
    fontSize: 17,
    fontWeight: "600",
  },
  content: {
    padding: spacing.lg,
  },
  sectionTitle: {
    color: palette.textSecondary,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
});
