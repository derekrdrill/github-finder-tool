<script setup lang="ts">
const route = useRoute();
const userId = route.params.userId as string;

const { data: userProfile } = await fetchGhUser({
  userId,
});

const { data: userRepos } = await fetchGhRepoByUser({
  userId,
});

const {
  avatar_url: avatarUrl,
  bio,
  company,
  created_at,
  email,
  followers,
  following,
  html_url: htmlUrl,
  location,
  login,
  name,
  twitter_username: twitterUsername,
  type,
} = userProfile || {};

const followersAndFollowing = [`${followers ?? 0} followers`, `${following ?? 0} following`];

const memberSince = new Date(created_at || '').toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
</script>

<template>
  <div class="flex flex-col gap-6 mx-5 pb-8 md:mx-20 2xl:mx-40">
    <button class="btn btn-link no-underline p-0 w-fit" @click="useNuxtApp().$router.back">
      <Icon name="material-symbols:keyboard-double-arrow-left-rounded" size="20" />
      Go back
    </button>
    <div class="flex flex-col gap-4 items-center md:items-start">
      <UserPersonalInfoAndImage
        :avatar-url="avatarUrl"
        :bio="bio"
        :login="login"
        :name="name"
        :type="type"
      />
      <div class="flex flex-col gap-12 w-full md:flex-row">
        <div class="flex flex-col gap-3">
          <div class="flex flex-col gap-2 lg:gap-0.5">
            <UserMetadata :metadata="followersAndFollowing" font-size="sm" icon="mdi:user-group" />
            <UserMetadata :metadata="location" icon="openmoji:round-pushpin" />
            <UserMetadata :metadata="company" icon="openmoji:office-building" />
            <UserMetadata :metadata="email" icon="openmoji:e-mail" />
            <UserMetadata
              :icon-size="14"
              :link="`https://www.x.com/${twitterUsername}`"
              :metadata="twitterUsername"
              icon="logos:x"
            />
          </div>
          <p class="text-xs mt-2">
            <span class="font-semibold">Member since:</span> {{ memberSince }}
          </p>
          <a :href="htmlUrl" class="btn btn-primary btn-soft btn-sm mt-4 w-full" target="_blank"
            >View on Github</a
          >
        </div>
        <div class="grid grid-cols-1 gap-4 w-full lg:grid-cols-2 xl:grid-cols-3">
          <UserRepoCard
            v-for="repo in userRepos"
            :key="repo.id"
            :description="repo.description"
            :html-url="repo.html_url"
            :language="repo.language"
            :name="repo.name"
            :updated-at="repo.updated_at"
          />
        </div>
      </div>
    </div>
  </div>
</template>
