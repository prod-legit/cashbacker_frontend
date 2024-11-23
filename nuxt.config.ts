// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    modules: [
        "@nuxt/ui",
        "@nuxt/fonts",
        "@nuxt/image",
        "nuxt-aos",
        "@nuxtjs/seo",
    ],
    future: {
        compatibilityVersion: 4,
    },
    css: ["@/assets/global.scss"],
    app: {
        pageTransition: {
            name: "page",
            mode: "out-in",
        },
    },
    site: {
        url: "https://example.com",
        name: "Анализ кэшбека | Т-Банк",
    },
    runtimeConfig: {
        public: {
            api_url: process.env.NUXT_PUBLIC_API_URL,
        },
    },
});
