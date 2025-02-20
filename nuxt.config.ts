// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/color-mode', 'pinia-plugin-persistedstate/nuxt','@vesp/nuxt-fontawesome'],
  colorMode: {
    preference: 'light', 
    classSuffix: '',
    fallback: 'dark'
  },
  css: ['@/assets/css/main.css'], 
  fontawesome: {
    icons:{
      solid: ['trash','pencil', 'floppy-disk', 'check', 'xmark']
    }
  }
})
