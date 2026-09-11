import React from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CategoryCard } from "../components/CategoryCard";
import { meditationScripts } from "../content/scripts";
import { categoryThemes, palette, spacing } from "../theme/theme";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const categories: Array<keyof typeof meditationScripts> = ["sonno", "focus", "ansia"];

export function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={palette.background} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.headerTextBlock}>
            <Text style={styles.eyebrow}>Un momento per te</Text>
            <Text style={styles.title}>Serena</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("Settings")}
            hitSlop={12}
            style={styles.settingsButton}
          >
            <Ionicons name="settings-outline" size={22} color={palette.textSecondary} />
          </Pressable>
        </View>
        <Text style={styles.subtitle}>
          Scegli il tuo obiettivo. Ogni sessione dura fino a 5 minuti, con voce guida e sottofondo
          rilassante.
        </Text>

        <View style={styles.list}>
          {categories.map((id) => {
            const script = meditationScripts[id];
            const theme = categoryThemes[id];
            return (
              <CategoryCard
                key={id}
                title={script.title}
                subtitle={script.subtitle}
                icon={script.icon}
                theme={theme}
                onPress={() => navigation.navigate("Player", { categoryId: id })}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  headerTextBlock: {
    flex: 1,
  },
  settingsButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xs,
  },
  eyebrow: {
    color: palette.textSecondary,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: spacing.xs,
  },
  title: {
    color: palette.textPrimary,
    fontSize: 34,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: palette.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  list: {
    gap: spacing.sm,
  },
});
