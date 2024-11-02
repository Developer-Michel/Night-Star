import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { version } from "./package.json";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    open: true,
    port: 3000
  },
  define: {
    "import.meta.env.APP_VERSION": JSON.stringify(version)
  }
});
