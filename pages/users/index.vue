<script setup lang="ts">
const appStore = useAppStore();
const ghSearchUsers = ref<GHSearchResponse[]>([]);
const ghSearchUsersTotal = ref<number>(0);
const ghSearchUsersPage = ref<number>(1);
const hasMounted = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const shouldLoadMoreGhUsers = ref<boolean>(false);

const handleFetchGhSearchUsers = async () => {
  isLoading.value = true;

  fetchGhSearchUsers({
    page: ghSearchUsersPage.value,
    perPage: 100,
    username: appStore.ghSearchValue,
  }).then(data => {
    const ghSearchUsersData = data.data;
    const ghSearchUsersTotalData = data.total;

    const ghSearchUsersValue = [
      ...new Map(
        [...ghSearchUsers.value, ...ghSearchUsersData].map(user => [user.id, user])
      ).values(),
    ];
    ghSearchUsers.value = ghSearchUsersPage.value === 1 ? ghSearchUsersData : ghSearchUsersValue;
    ghSearchUsersPage.value = ghSearchUsersPage.value + 1;
    ghSearchUsersTotal.value = ghSearchUsersTotalData > 1000 ? 1000 : ghSearchUsersTotalData;
    isLoading.value = false;
  });
};

const handleGhSearchUsersPageReset = () => {
  ghSearchUsersPage.value = 1;
};

onBeforeRouteLeave(() => {
  clearNuxtState();
});

onMounted(() => {
  hasMounted.value = true;
});

watch(
  [() => ghSearchUsersPage.value, () => appStore.ghSearchValue, () => hasMounted.value],
  ([newPage]) => {
    if (newPage === 1) {
      handleFetchGhSearchUsers();
    }
  }
);

watch([() => ghSearchUsers.value], ([newSearchValues]) => {
  shouldLoadMoreGhUsers.value = newSearchValues.length < ghSearchUsersTotal.value;
});
</script>

<template>
  <div
    class="bg-base-100 border-b-2 border-b-info-content h-32 mb-6 pt-10 shadow-lg sticky top-0 w-full z-20"
  >
    <div class="grid grid-cols-12 gap-4">
      <div class="col-start-2 col-end-9 md:col-start-3 md:col-end-11">
        <Searchbar
          :button-text="'Search'"
          :handle-click="handleGhSearchUsersPageReset"
          :results-count="ghSearchUsersTotal > 1000 ? 1000 : ghSearchUsersTotal"
          :should-disable-search-on-change="true"
        />
      </div>
      <p class="col-span-3 lg:col-span-1 italic pt-2">
        {{ ghSearchUsersTotal > 1000 ? 1000 : ghSearchUsersTotal }} results
      </p>
    </div>
  </div>
  <div
    class="container gap-8 grid grid-cols-1 mx-auto pb-8 md:gap-20 md:grid-cols-2 md:px-8 lg:grid-cols-5 lg:px-12"
  >
    <div
      v-if="!ghSearchUsers.length"
      v-for="_ in 10"
      class="col-span-1 h-52 skeleton bg-base-300 w-full"
    />
    <UserResultCard
      v-for="(user, userIndex) in ghSearchUsers"
      :key="user.id"
      :avatar-url="user.avatar_url"
      :html-url="user.html_url"
      :index="userIndex"
      :login="user.login"
    />
  </div>
  <button
    v-if="shouldLoadMoreGhUsers && !isLoading"
    class="btn btn-link flex justify-center py-10 w-full"
    @click="handleFetchGhSearchUsers"
  >
    Load more results
  </button>
  <div v-else-if="shouldLoadMoreGhUsers && isLoading" class="flex justify-center py-10">
    <div class="bg-accent flex justtify-center loading loading-dots loading-lg" />
  </div>
</template>
