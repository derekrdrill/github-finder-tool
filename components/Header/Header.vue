<script setup lang="ts">
const headerRef = useState<HTMLElement | null>('headerRef', () => null);
</script>
<template>
  <div class="flex justify-center items-center p-4 z-20" ref="headerRef">
    <Icon name="logos:github-octocat" size="60" />
    <div class="flex flex-col">
      <h1 class="text-4xl font-bold text-indigo-100 neon-glow">Github Finder Live</h1>
      <p class="text-gray-500">Find just who you're looking for 👀</p>
    </div>
  </div>
</template>
