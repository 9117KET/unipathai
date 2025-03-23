/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--uni-border)",
        input: "var(--uni-input)",
        ring: "var(--uni-ring)",
        background: "var(--uni-background)",
        foreground: "var(--uni-foreground)",
        primary: {
          DEFAULT: "var(--uni-primary)",
          foreground: "var(--uni-foreground)",
        },
        secondary: {
          DEFAULT: "var(--uni-accent)",
          foreground: "var(--uni-foreground)",
        },
        destructive: {
          DEFAULT: "var(--uni-error)",
          foreground: "var(--uni-foreground)",
        },
        muted: {
          DEFAULT: "var(--uni-muted)",
          foreground: "var(--uni-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--uni-accent)",
          foreground: "var(--uni-foreground)",
        },
        popover: {
          DEFAULT: "var(--uni-background)",
          foreground: "var(--uni-foreground)",
        },
        card: {
          DEFAULT: "var(--uni-background)",
          foreground: "var(--uni-foreground)",
        },
        uni: {
          primary: "var(--uni-primary)",
          accent: "var(--uni-accent)",
          gold: "var(--uni-gold)",
          success: "var(--uni-success)",
          error: "var(--uni-error)",
          warning: "var(--uni-warning)",
          info: "var(--uni-info)",
          background: "var(--uni-background)",
          foreground: "var(--uni-foreground)",
          muted: "var(--uni-muted)",
          "muted-foreground": "var(--uni-muted-foreground)",
          border: "var(--uni-border)",
          input: "var(--uni-input)",
          ring: "var(--uni-ring)",
        },
      },
      borderRadius: {
        lg: "var(--uni-radius)",
        md: "calc(var(--uni-radius) - 2px)",
        sm: "calc(var(--uni-radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
        pulse: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        shine: {
          "0%": { backgroundPosition: "-100% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        gradient: "gradient 8s ease infinite",
        float: "float 3s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
        shine: "shine 3s linear infinite",
      },
    },
  },
  plugins: [import("tailwindcss-animate")],
};
