export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://titanstar-legends-rune-calculator-api.vercel.app/api"
    : "http://localhost:8000/api";
