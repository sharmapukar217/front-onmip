import type { CapacitorConfig } from "@capacitor/cli";
import { siteConfig } from "./src/config";

const config: CapacitorConfig = {
  webDir: "dist",
  appName: siteConfig.title,
  appId: "com.omnip.coralfactory",
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },

  ios: { path: "native/ios" },
  android: { path: "native/android" },
};

export default config;
