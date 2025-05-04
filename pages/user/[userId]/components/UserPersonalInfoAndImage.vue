<script setup lang="ts">
defineProps<{
  avatarUrl?: string;
  bio?: string;
  login?: string;
  name?: string;
  type?: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-6 items-center md:flex-row md:gap-12">
    <img :src="avatarUrl" alt="User Avatar" class="w-40 h-40 rounded-full" />
    <div class="flex flex-col gap-2 items-center md:items-start">
      <div class="flex flex-col justify-center">
        <h1 class="text-xl font-bold">{{ name }}</h1>
        <p class="text-center text-xs md:text-start">{{ login }}</p>
      </div>
      <div class="badge badge-soft badge-accent">{{ type }}</div>
      <p v-if="bio" class="text-center md:text-start">{{ bio }}</p>
    </div>
  </div>
</template>
