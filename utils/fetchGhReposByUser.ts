import axios from 'axios';
import { useAsyncData, useRuntimeConfig } from '#app';

export const fetchGhRepoByUser = async ({ userId }: { userId: string }) => {
  const runtimeConfig = useRuntimeConfig();
  const githubApiUrl = runtimeConfig.public.githubApiUrl as string;
  const githubApiToken = runtimeConfig.public.githubApiToken as string;

  const ghRequest = axios.create({
    baseURL: githubApiUrl,
    headers: { Authorization: `token ${githubApiToken}` },
  });

  const { data, error, status } = await useAsyncData<GHUserRepo[]>(
    `gh-user-repos-${userId}`,
    async () => {
      const response = await ghRequest.get(`/users/${userId}/repos`);
      return response.data;
    }
  );

  if (error.value) {
    throw new Error('Failed to fetch GitHub user data');
  }

  const reposSorted = data?.value
    ?.sort((a, b) => {
      const dateA = new Date(a.updated_at);
      const dateB = new Date(b.updated_at);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 10);

  return {
    data: reposSorted,
    status: status.value,
    error: error.value,
  };
};
