/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from roadmap document
        "uni-primary": "#002A5E", // Deep Blue - Trust, reliability, professionalism
        "uni-gold": "#F9A826", // Soft Gold - Aspiration and premium
        "uni-white": "#F5F7FA", // Clean White - Background & contrast

        // Supporting colors
        "uni-accent": "#4361EE", // Accent Blue - Action buttons, links
        "uni-success": "#2EC4B6", // Success Green - Completions, confirmations
        "uni-warning": "#FF9F1C", // Warning Orange - Alerts, deadlines
        "uni-error": "#E63946", // Error Red - Errors, required actions

        // Original extended colors
        indigo: {
          950: "#1e1b4b",
        },
        purple: {
          950: "#3b0764",
        },
        pink: {
          950: "#500724",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-y": "gradient-y 15s ease infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
        "gradient-x-slow": "gradient-x 25s ease infinite",
        "gradient-x-fast": "gradient-x 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 5px 15px rgba(0, 0, 0, 0.05)",
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
        elevated: "0 20px 40px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
