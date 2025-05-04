<script setup lang="ts">
const appStore = useAppStore();
const ghSearchUsers = useState<GHSearchResponse[]>('ghSearchUsers', () => []);
const ghSearchUsersTotal = useState<number>('ghSearchUsersTotal', () => 0);
const ghSearchUsersPage = useState<number>('ghSearchUsersPage', () => 1);
const shouldLoadMoreGhUsers = useState<boolean>('shouldLoadMoreGhUsers', () => false);

const handleFetchGhSearchUsers = async () => {
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
  });
};

onBeforeRouteLeave(() => {
  clearNuxtState('ghSearchUsersPage');
});

watchEffect(() => {
  if (ghSearchUsersPage.value === 1 && appStore.ghSearchValue) {
    handleFetchGhSearchUsers();
  }

  shouldLoadMoreGhUsers.value = ghSearchUsers.value.length < ghSearchUsersTotal.value;
});
</script>

<template>
  <div
    class="bg-gray-900 border-b-2 border-b-info-content h-32 mb-6 pt-10 shadow-2xl sticky top-0 w-full z-20"
  >
    <div class="grid grid-cols-12 gap-4">
      <div class="col-start-2 col-end-9 md:col-start-3 md:col-end-11">
        <Searchbar
          :button-text="'Search'"
          :handle-click="
            () => {
              if (ghSearchUsers?.length) {
                ghSearchUsers = [];
              }
              ghSearchUsersTotal = 0;
              ghSearchUsersPage = 1;
              handleFetchGhSearchUsers();
            }
          "
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
    <UserResultCard
      v-for="user in ghSearchUsers"
      :key="user.id"
      :avatar-url="user.avatar_url"
      :html-url="user.html_url"
      :login="user.login"
    />
  </div>
  <button
    v-if="shouldLoadMoreGhUsers"
    class="btn btn-link flex justify-center py-10 w-full"
    @click="handleFetchGhSearchUsers"
  >
    Load more results
  </button>
</template>
