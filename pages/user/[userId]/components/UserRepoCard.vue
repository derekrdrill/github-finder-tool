<script setup lang="ts">
const { language } = defineProps<{
  description: string | null;
  html_url: string;
  language: string;
  name: string;
  updatedAt: string;
}>();
const languageForGhColor = language as keyof typeof GH_COLORS;
const cardBgColorByLanguage = GH_COLORS[languageForGhColor] || 'lightgray';
</script>

<template>
  <a
    class="card col-span-1 bg-gray-700 border border-gray-700 h-40 shadow-xl hover:border-red-400"
    target="_blank"
    :href="html_url"
  >
    <div class="card-body p-3 overflow-hidden">
      <div class="flex flex-col flex-start">
        <div class="badge text-black text-xs" :style="{ backgroundColor: cardBgColorByLanguage }">
          {{ language || 'No language found ' }}
        </div>
        <h2 class="card-title truncate">
          {{ name }}
        </h2>
      </div>
      <p class="max-h-20 truncate">
        {{ description || 'No description provided' }}
      </p>
      <p>Last updated: {{ updatedAt }}</p>
    </div>
  </a>
</template>
