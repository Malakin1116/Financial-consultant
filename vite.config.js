import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // SPA маршрути працюватимуть без 404
  },
  build: {
    sourcemap: true,
  },
  preview: {
    historyApiFallback: true,
  },
});
