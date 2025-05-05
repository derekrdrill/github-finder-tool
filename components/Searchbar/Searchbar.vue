<script setup lang="ts">
const {
  buttonText = 'View all results',
  handleClick,
  shouldDisableSearchOnChange,
} = defineProps<{
  buttonText?: string;
  handleClick?: () => void;
  resultsCount?: number;
  shouldDisableSearchOnChange?: boolean;
}>();

const appStore = useAppStore();
const ghSearchMenuItems = ref<GHSearchResponse[]>([]);
const isLoading = ref<boolean>(false);

const handleSearchChange = async (e: Event) => {
  const searchValue = (e.target as HTMLInputElement).value;
  appStore.setGhSearchValue(searchValue);
};

const handleSearchClear = () => {
  appStore.setGhSearchValue('');
  ghSearchMenuItems.value = [];
  isLoading.value = false;
};

const handleSearchButtonClick = () => {
  if (appStore.ghSearchValue?.length) {
    if (handleClick) {
      handleClick();
    } else {
      navigateTo(`/users`);
    }
  }
};

watchEffect(() => {
  if (appStore.ghSearchValue?.length > 2 && !shouldDisableSearchOnChange) {
    isLoading.value = true;

    fetchGhSearchUsers({
      perPage: 10,
      username: appStore.ghSearchValue,
    }).then(data => {
      ghSearchMenuItems.value = data.data;
    });

    isLoading.value = false;
  } else {
    ghSearchMenuItems.value = [];
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="flex gap-4 items-center relative">
      <input
        v-model="appStore.ghSearchValue"
        class="input w-full pr-16 bg-gray-800"
        placeholder="Enter a Github username"
        @input="handleSearchChange"
      />
      <div class="absolute flex gap-2 items-center right-1 top-1 z-20">
        <Icon name="line-md:loading-twotone-loop" size="20" v-if="isLoading" />
        <button
          class="cursor-pointer flex items-center text-red-400 hover:text-red-600"
          @click="handleSearchClear"
        >
          <Icon
            name="line-md:close-circle-twotone"
            size="20"
            v-if="!isLoading && appStore.ghSearchValue"
          />
        </button>
        <button class="btn btn-primary btn-sm" @click="handleSearchButtonClick">
          {{ buttonText }}
        </button>
      </div>
    </div>
    <div
      class="dropdown border max-h-96 overflow-auto relative rounded-box top-1"
      v-if="ghSearchMenuItems?.length > 0 && !shouldDisableSearchOnChange"
    >
      <ul class="flex flex-col w-full bg-gray-800">
        <li
          :key="item.id"
          class="flex justify-between items-center p-4 w-full hover:bg-base-300"
          v-for="item in ghSearchMenuItems"
        >
          <div>
            <div class="flex gap-2 items-center">
              <img :src="item.avatar_url" alt="Avatar" class="w-8 h-8 rounded-full mr-2" />
              <span>{{ item.login }}</span>
            </div>
          </div>
          <button class="btn btn-link">
            <a :href="`/user/${item.login}`">View Profile</a>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
