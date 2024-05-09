export default defineNuxtConfig({
  srcDir: "src",
  devtools: { enabled: true },
  ssr: process.env.NO_SSR !== "true",
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/i18n",
    "nuxt-zod-i18n",
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
  ],
  components: false,
  i18n: {
    lazy: true,
    langDir: "locales",
    defaultLocale: "en",
    locales: [
      { code: "en", file: "en-US.json" },
      { code: "fr", file: "fr-FR.json" },
    ],
    // detectBrowserLanguage: {
    //   useCookie: true,
    //   cookieKey: "locale",
    // },
    strategy: "no_prefix",
  },

  colorMode: { classSuffix: "", dataValue: "mode" },
  tailwindcss: { cssPath: "assets/global.css" },
});
