import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  app: {
    head: {
      title: 'GitHub Finder Live',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
        },
      ],
    },
  },
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
    {
      path: '~/pages/users/components',
      pathPrefix: false,
    },
  ],
  modules: [
    '@nuxtjs/storybook',
    '@nuxt/test-utils/module',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-icon',
    '@nuxtjs/color-mode',
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
