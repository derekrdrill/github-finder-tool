<script setup lang="ts">
const { language, updatedAt } = defineProps<{
  description: string | null;
  htmlUrl: string;
  language: string;
  name: string;
  updatedAt: string;
}>();
const bgColorLanguage = language as keyof typeof GH_COLORS;
const cardBgColorByLanguage = GH_COLORS[bgColorLanguage] || 'lightgray';
const updatedAtString = new Date(updatedAt).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const isHoveringRepoCard = ref(false);
</script>

<template>
  <a
    :href="htmlUrl"
    class="card col-span-1 bg-base-200 border border-base-300 h-40 drop-shadow-xs drop-shadow-gray-300 md:drop-shadow-none hover:border-red-400"
    target="_blank"
    @mouseover="isHoveringRepoCard = true"
    @mouseout="isHoveringRepoCard = false"
  >
    <div class="card-body p-3 overflow-hidden">
      <div class="flex flex-col flex-start">
        <div class="flex justify-between text-xs">
          <span class="badge text-black" :style="{ backgroundColor: cardBgColorByLanguage }">
            {{ language || 'No language found ' }}
          </span>
          <span
            v-bind:class="{
              'lg:hidden': !isHoveringRepoCard,
              block: isHoveringRepoCard,
            }"
          >
            <Icon name="line-md:external-link" size="16" />
          </span>
        </div>
        <h2 class="card-title truncate">
          {{ name }}
        </h2>
      </div>
      <p class="max-h-20 truncate">
        {{ description || 'No description provided' }}
      </p>
      <p>Last updated: {{ updatedAtString }}</p>
    </div>
  </a>
</template>
