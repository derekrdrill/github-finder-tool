<script setup lang="ts">
const { isLastItem, login } = defineProps<{
  avatarUrl: string;
  htmlUrl: string;
  index: number;
  isLastItem?: boolean;
  login: string;
}>();

const profileLink = `/user/${login}`;
</script>
<template>
  <div
    v-bind:class="[
      'col-span-1 pb-8 px-4 md:border-none md:pb-0 md:px-0',
      {
        'border-b': !isLastItem,
        'border-b-gray-700': $colorMode.value === 'dark',
        'border-b-base-300': $colorMode.value === 'light',
      },
    ]"
  >
    <div>
      <img :src="avatarUrl" alt="User Avatar" class="h-28 w-28 rounded-4xl" />
      <h2 class="card-title">{{ login }}</h2>
    </div>
    <div class="flex flex-col gap-2">
      <NuxtLink :to="profileLink" class="btn btn-primary btn-soft btn-sm">View Profile</NuxtLink>
      <NuxtLink :to="htmlUrl" class="btn btn-secondary btn-soft btn-sm" target="_blank"
        >View on Github</NuxtLink
      >
    </div>
  </div>
</template>
