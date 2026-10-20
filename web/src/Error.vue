<template>
  <div>Error page</div>
</template>

<script lang="ts" setup>
import type { NuxtError } from "#app";

interface ErrorProps {
  error: NuxtError;
}

defineProps<ErrorProps>();
</script>
