import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load environment variables from .env files
  const env = loadEnv(mode, ".", "");

  // Support both VITE_GEMINI_API_KEY (standard Vite) and GEMINI_API_KEY (for Vercel compatibility)
  const geminiKey = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY;

  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [react()],
    // Use define to inject environment variables at build time
    // This works by replacing the literal strings in your code
    define: {
      // Inject both variants so code can access either
      "import.meta.env.GEMINI_API_KEY": JSON.stringify(geminiKey || ""),
      "import.meta.env.VITE_GEMINI_API_KEY": JSON.stringify(
        env.VITE_GEMINI_API_KEY || geminiKey || ""
      ),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
