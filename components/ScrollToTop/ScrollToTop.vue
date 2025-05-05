<script setup lang="ts">
const headerRef = useState<HTMLElement | null>('headerRef');
const isVisible = ref(false);

const handleScroll = () => {
  if (headerRef) {
    const headerBottom = headerRef.value?.getBoundingClientRect().bottom ?? 0;
    isVisible.value = window.scrollY > headerBottom + 300;
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <button
    v-if="isVisible"
    class="btn btn-soft btn-sm btn-accent fixed flex gap-2 items-center bottom-4 right-4 z-40"
    @click="scrollToTop"
  >
    Scroll to top <Icon name="material-symbols:arrow-upward-rounded" size="20" />
  </button>
</template>
