import axios from 'axios';

export const fetchGhSearchUsers = async ({
  page,
  perPage,
  username,
}: {
  page?: number;
  perPage: number;
  username: string;
}) => {
  const runtimeConfig = useRuntimeConfig();
  const githubApiUrl = runtimeConfig.public.githubApiUrl as string;
  const githubApiToken = runtimeConfig.public.githubApiToken as string;

  const ghRequest = axios.create({
    baseURL: githubApiUrl,
    headers: { Authorization: `token ${githubApiToken}` },
  });

  const ghRequestParams = new URLSearchParams({
    page: page?.toString() || '1',
    per_page: perPage.toString(),
    q: username,
  });

  const { data, error, status } = await useAsyncData(
    `gh-search-users-${username}-${perPage}-${page}`,
    async () => await ghRequest.get(`/search/users?${ghRequestParams}`),
    { immediate: true }
  );

  if (error.value) {
    throw new Error('Failed to fetch GitHub user data');
  }

  return {
    data: data.value?.data.items,
    total: data.value?.data.total_count,
    status: status.value,
    error: error.value,
  };
};
