import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { CategoryTheme } from "../theme/theme";
import { radius, spacing } from "../theme/theme";

interface CategoryCardProps {
  title: string;
  subtitle: string;
  icon: string;
  theme: CategoryTheme;
  onPress: () => void;
}

export function CategoryCard({ title, subtitle, icon, theme, onPress }: CategoryCardProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}>
      <LinearGradient
        colors={theme.gradient}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={[styles.iconBadge, { backgroundColor: `${theme.accent}26` }]}>
          <Ionicons name={icon as any} size={26} color={theme.accent} />
        </View>
        <View style={styles.textBlock}>
          <Text style={[styles.title, { color: theme.textOnGradient }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: theme.textOnGradient }]} numberOfLines={2}>
            {subtitle}
          </Text>
        </View>
        <View style={styles.footerRow}>
          <Ionicons name="time-outline" size={14} color={theme.accent} />
          <Text style={[styles.duration, { color: theme.accent }]}>fino a 5 min</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    minHeight: 128,
    justifyContent: "space-between",
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  textBlock: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.75,
    lineHeight: 19,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  duration: {
    fontSize: 12,
    fontWeight: "500",
    opacity: 0.9,
  },
});
