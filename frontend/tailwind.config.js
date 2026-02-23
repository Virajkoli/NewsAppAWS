/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3498db",
        "primary-dark": "#2980b9",
        accent: "#1a1a2e",
        success: "#2ecc71",
        "success-dark": "#27ae60",
        danger: "#e74c3c",
        "danger-dark": "#c0392b",
        muted: "#95a5a6",
        "muted-dark": "#7f8c8d",
      },
    },
  },
  plugins: [],
};
