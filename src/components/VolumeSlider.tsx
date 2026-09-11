import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { palette, spacing } from "../theme/theme";

interface VolumeSliderProps {
  label: string;
  icon: string;
  accent: string;
  value: number;
  onValueChange: (value: number) => void;
  labelColor?: string;
  valueColor?: string;
  trackColor?: string;
}

export function VolumeSlider({
  label,
  icon,
  accent,
  value,
  onValueChange,
  labelColor = palette.textPrimary,
  valueColor = palette.textSecondary,
  trackColor = palette.border,
}: VolumeSliderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <View style={[styles.iconBadge, { backgroundColor: `${accent}26` }]}>
          <Ionicons name={icon as any} size={18} color={accent} />
        </View>
        <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
        <Text style={[styles.value, { color: valueColor }]}>{Math.round(value * 100)}%</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor={accent}
        maximumTrackTintColor={trackColor}
        thumbTintColor={accent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  label: {
    flex: 1,
    color: palette.textPrimary,
    fontSize: 16,
    fontWeight: "500",
  },
  value: {
    color: palette.textSecondary,
    fontSize: 13,
    fontVariant: ["tabular-nums"],
  },
  slider: {
    width: "100%",
    height: 32,
  },
});
