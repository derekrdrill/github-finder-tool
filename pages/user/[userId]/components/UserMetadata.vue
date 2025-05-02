<script setup lang="ts">
import classNames from 'classnames';
import { NuxtLink } from '#components';

const {
  fontSize = 'md',
  link,
  metadata,
} = defineProps<{
  fontSize?: 'sm' | 'md' | 'lg';
  icon: string;
  iconSize?: number;
  link?: string;
  metadata?: string | string[];
  size?: number;
}>();

const isMetaDataArray = metadata && Array.isArray(metadata);
</script>

<template>
  <component
    :class="
      classNames('flex gap-2 items-center', {
        'text-sm md:text-xs': fontSize === 'sm',
        'text-md md:text-sm': fontSize === 'md',
        'text-lg md:text-base': fontSize === 'lg',
        'link link-info': link,
      })
    "
    :is="link ? NuxtLink : 'p'"
    :target="link ? '_blank' : undefined"
    :to="link"
    v-if="metadata"
  >
    <Icon :name="icon" :size="iconSize" class="fill-white" mode="svg" />
    <span v-if="isMetaDataArray" class="flex">
      <span v-for="(item, index) in metadata" :key="item" class="flex items-center">
        {{ item }}
        <span v-if="index < metadata.length - 1">
          <Icon name="mdi:dot" size="20" class="fill-white" mode="svg" />
        </span>
      </span>
    </span>
    <span v-else>{{ metadata }}</span>
  </component>
</template>
