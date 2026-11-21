<template>
  <div class="flex flex-col md:flex-row md:items-center md:justify-between py-2">
    <p class="font-medium">{{ song.title }}</p>
    <p class="text-sm opacity-80 shrink-0">{{ song.composer }}</p>
  </div>
</template>

<script lang="ts" setup>
interface SongItemProps {
  song: Song;
}

defineProps<SongItemProps>();
</script>
