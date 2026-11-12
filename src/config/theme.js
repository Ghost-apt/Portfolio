/**
 * =====================================================================
 * DESIGN SYSTEM THEME TOKENS
 * =====================================================================
 * Central design tokens: dark and light mode palettes, typography,
 * border radius, and glassmorphism.
 */

export const theme = {
  // Dark Theme Palette (Default)
  dark: {
    bgPrimary: "#000000",
    bgSecondary: "#0A0A0A",
    bgCard: "#111111",
    bgCardHover: "#171717",
    textPrimary: "#FFFFFF",
    textSecondary: "#B0B0B0",
    textMuted: "#777777",
    borderColor: "#292929",
    borderSubtle: "rgba(255, 255, 255, 0.10)",
    borderMedium: "rgba(255, 255, 255, 0.18)",
    accentColor: "#FFFFFF",
    accentSecondary: "#A1A1AA",
    navBg: "rgba(0, 0, 0, 0.80)",
    glassBg: "rgba(255, 255, 255, 0.04)",
  },

  // Light Theme Palette
  light: {
    bgPrimary: "#FFFFFF",
    bgSecondary: "#F7F7F7",
    bgCard: "#FFFFFF",
    bgCardHover: "#F2F2F2",
    textPrimary: "#111111",
    textSecondary: "#555555",
    textMuted: "#888888",
    borderColor: "#E5E5E5",
    borderSubtle: "rgba(0, 0, 0, 0.08)",
    borderMedium: "rgba(0, 0, 0, 0.15)",
    accentColor: "#111111",
    accentSecondary: "#444444",
    navBg: "rgba(255, 255, 255, 0.85)",
    glassBg: "rgba(0, 0, 0, 0.03)",
  },

  // Backward-compatible color mapping (defaults to dark)
  colors: {
    pureBlack: "#000000",
    charcoal: "#09090b",
    darkGrey: "#121216",
    smokeGrey: "#27272a",
    silver: "#a1a1aa",
    lightSilver: "#e4e4e7",
    pureWhite: "#ffffff",

    bgPrimary: "#050816",
    bgSecondary: "#0B1120",
    bgCard: "#101A30",
    bgCardHover: "#162244",

    accentBlue: "#3B82F6",
    accentCyan: "#22D3EE",
    accentIndigo: "#6366F1",
    accentEmerald: "#10B981",

    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    textMuted: "#64748B",

    borderSubtle: "rgba(255, 255, 255, 0.08)",
    borderMedium: "rgba(255, 255, 255, 0.16)",
    borderHighlight: "rgba(255, 255, 255, 0.35)",
  },

  fonts: {
    sans: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    display: "'Space Grotesk', Sora, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  radii: {
    sm: "0.375rem",   // 6px
    md: "0.5rem",     // 8px
    lg: "0.75rem",    // 12px
    xl: "1rem",       // 16px
    "2xl": "1.5rem",  // 24px
    "3xl": "2rem",    // 32px
    full: "9999px",
  },

  glass: {
    hero: {
      background: "rgba(255, 255, 255, 0.03)",
      backdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.12)",
    },
    card: {
      background: "rgba(16, 26, 48, 0.65)",
      backdropFilter: "blur(16px)",
      border: "1px solid rgba(59, 130, 246, 0.15)",
    },
  },
};

export default theme;
