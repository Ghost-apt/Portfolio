/**
 * =====================================================================
 * DESIGN SYSTEM THEME TOKENS
 * =====================================================================
 * Central design tokens: colors, typography, border radius, and glassmorphism.
 */

export const theme = {
  colors: {
    // Monochromatic Hero Canvas
    pureBlack: "#000000",
    charcoal: "#09090b",
    darkGrey: "#121216",
    smokeGrey: "#27272a",
    silver: "#a1a1aa",
    lightSilver: "#e4e4e7",
    pureWhite: "#ffffff",

    // Lower Portfolio Deep Dark Palette
    bgPrimary: "#050816",
    bgSecondary: "#0B1120",
    bgCard: "#101A30",
    bgCardHover: "#162244",

    // Functional & Secondary Accents
    accentBlue: "#3B82F6",
    accentCyan: "#22D3EE",
    accentIndigo: "#6366F1",
    accentEmerald: "#10B981",

    // Text hierarchy
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    textMuted: "#64748B",

    // Borders
    borderSubtle: "rgba(255, 255, 255, 0.08)",
    borderMedium: "rgba(255, 255, 255, 0.16)",
    borderHighlight: "rgba(255, 255, 255, 0.35)",
    borderBlue: "rgba(59, 130, 246, 0.2)",
    borderCyan: "rgba(34, 211, 238, 0.3)",
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
