import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: ['~/main.css'],
  devtools: { enabled: true },
  imports: {
    dirs: ['components', 'constants', 'stores', 'utils', 'types'],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    {
      path: '~/pages/user/[userId]/components',
      pathPrefix: false,
    },
  ],
  modules: [
    '@nuxtjs/storybook',
    '@nuxt/test-utils/module',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-icon',
  ],
  runtimeConfig: {
    public: {
      githubApiUrl: process.env.NUXT_GITHUB_API_URL,
      githubApiToken: process.env.NUXT_GITHUB_API_TOKEN,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
