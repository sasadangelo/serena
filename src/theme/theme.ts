export type CategoryId = "sonno" | "focus" | "ansia";

export interface CategoryTheme {
  id: CategoryId;
  gradient: [string, string];
  accent: string;
  textOnGradient: string;
}

export const categoryThemes: Record<CategoryId, CategoryTheme> = {
  sonno: {
    id: "sonno",
    gradient: ["#0B1026", "#1B2A4A"],
    accent: "#8FB8FF",
    textOnGradient: "#EAF0FF",
  },
  focus: {
    id: "focus",
    gradient: ["#0B1F1C", "#153B34"],
    accent: "#7FE7C4",
    textOnGradient: "#E7FFF6",
  },
  ansia: {
    id: "ansia",
    gradient: ["#201829", "#3A2440"],
    accent: "#F0B7DA",
    textOnGradient: "#FBEAF5",
  },
};

export const palette = {
  background: "#0E0E12",
  surface: "#17171D",
  surfaceAlt: "#1F1F27",
  textPrimary: "#F5F5F7",
  textSecondary: "#A3A3AD",
  border: "#2A2A33",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 12,
  md: 20,
  lg: 28,
  pill: 999,
};
