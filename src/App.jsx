import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes.jsx";
import useAuthStore from "./stores/useAuthStore.js";

export default function App() {
  // Ensure auth state is synced from localStorage on mount
  useEffect(() => {
    const state = useAuthStore.getState();
    // No initialize() provided; ensure store reflects persisted values
    if (!state.user && localStorage.getItem("user")) {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        state.setUser(user);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Set default theme to dark mode if not specified in localStorage
  useEffect(() => {
    let storedTheme = localStorage.getItem("amdox-theme");
    if (!storedTheme) {
      storedTheme = "dark";
      localStorage.setItem("amdox-theme", "dark");
    }
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  return <AppRoutes />;
}
