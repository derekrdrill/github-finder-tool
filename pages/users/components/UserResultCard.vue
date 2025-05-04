<script setup lang="ts">
const { login } = defineProps<{
  avatarUrl: string;
  htmlUrl: string;
  login: string;
}>();

const profileLink = `/user/${login}`;
</script>
<template>
  <div class="col-span-1 border-b border-b-info pb-8 px-4 md:border-none md:pb-0 md:px-0">
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
