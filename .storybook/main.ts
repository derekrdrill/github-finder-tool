import type { StorybookConfig } from '@storybook-vue/nuxt';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    // '@storybook/addon-links',
    // '@storybook/addon-essentials',
    // '@storybook/addon-interactions',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook-vue/nuxt',
    options: {},
  },
  //   docs: {
  //     autodocs: 'tag',
  //   },
};
export default config;
