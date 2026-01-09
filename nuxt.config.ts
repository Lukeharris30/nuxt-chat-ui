// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  build: {
    transpile: ['deep-chat']
  },
  vue: {
    compilerOptions: {
      isCustomElement: tag => ['deep-chat'].includes(tag)
    }
  }, 
  runtimeConfig: {
    // Private keys are only available on the server
    nuxtDatabricksConnection: process.env.NUXT_DATABRICKS_CONNECTION,
    // Public keys that are exposed to the client
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
    },
  }
})
