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
    <div class="flex flex-col gap-0.5" :class="{'opacity-75': program.status === ProgramStatus.CANCELLED}">
      <p class="flex items-center gap-2 font-medium">
        <span
          :class="{
            'line-through': program.status === ProgramStatus.CANCELLED,
            italic: program.status === ProgramStatus.TENTATIVE,
          }"
        >
          {{ program.venue }}
        </span>
        <AppButton
          v-if="program.status === ProgramStatus.CANCELLED"
          color="warning"
          readonly
          size="xs"
          text="Cancelled"
          variant="tonal"
        />
      </p>
      <p>{{ program.location || "N/A" }}&ensp;&bullet;&ensp;{{ formatDate(program.date, "HH:mm") }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";

interface ProgramItemProps {
  program: Program;
}

const props = defineProps<ProgramItemProps>();

// TODO: Style program item based on date (requires client-side calculation)

// TODO: Ensure this is a client-side calculation
const showYear = computed(() => dayjs(props.program.date).year() !== dayjs().year());
</script>
