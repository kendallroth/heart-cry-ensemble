<template>
  <div class="flex flex-row items-center gap-5 px-5 py-3">
    <div class="flex flex-col items-center">
      <p class="text-accent text-sm uppercase">
        {{ formatDate(program.date, "MMM") }}
      </p>
      <p class="text-2xl font-serif">{{ formatDate(program.date, "DD") }}</p>
      <p v-if="showYear" class="text-accent text-xs">
        {{ formatDate(program.date, "YYYY") }}
      </p>
    </div>
    <div class="flex flex-col gap-0.5">
      <p class="font-medium">{{ program.venue }}</p>
      <p>{{ program.location }}&ensp;&bullet;&ensp;{{ program.time }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";

interface ProgramItemProps {
  program: Program;
}

const props = defineProps<ProgramItemProps>();

const showYear = computed(
  () => dayjs(props.program.date).year() !== dayjs().year(),
);
</script>
