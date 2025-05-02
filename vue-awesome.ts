import { defineNuxtPlugin } from '#app';
import 'vue-awesome/icons'; // Import all icons (optional, can be optimized)
import Icon from 'vue-awesome/components/Icon.vue'; // Import the Icon component

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('v-icon', Icon); // Register the component globally
});
