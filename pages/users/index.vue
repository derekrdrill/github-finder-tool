<script setup lang="ts">
const appStore = useAppStore();

watchEffect(() => {
  if (appStore.ghSearchValue) {
    fetchGhUsers({
      perPage: 100,
      username: appStore.ghSearchValue,
    }).then(data => {
      console.log('Fetched GitHub users:', data);
    });
  }
});
</script>

<template>hey</template>
