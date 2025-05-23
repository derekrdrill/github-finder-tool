import axios from 'axios';

export const fetchGhUsers = async ({
  perPage,
  username,
}: {
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

  const { data, error, status } = await useAsyncData(
    `gh-users-${username}-${perPage}`,
    async () => await ghRequest.get(`/users/${username}`),
    { immediate: true }
  );

  if (error.value) {
    throw new Error('Failed to fetch GitHub user data');
  }

  return {
    data: data.value?.data.items,
    status: status.value,
    error: error.value,
  };
};
