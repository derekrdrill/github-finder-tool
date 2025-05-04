import axios from 'axios';

export const fetchGhUser = async ({ userId }: { userId: string }) => {
  const runtimeConfig = useRuntimeConfig();
  const githubApiUrl = runtimeConfig.public.githubApiUrl as string;
  const githubApiToken = runtimeConfig.public.githubApiToken as string;

  const ghRequest = axios.create({
    baseURL: githubApiUrl,
    headers: { Authorization: `token ${githubApiToken}` },
  });

  const { data, error, status } = await useAsyncData(`gh-user-${userId}`, async () => {
    const response = await ghRequest.get(`/users/${userId}`);
    return response.data;
  });

  if (error.value) {
    console.error('Error fetching GitHub user:', error.value);
    throw new Error(error.value.message || 'Failed to fetch GitHub user');
  }

  return {
    data: data.value,
    status: status.value,
    error: error.value,
  };
};
