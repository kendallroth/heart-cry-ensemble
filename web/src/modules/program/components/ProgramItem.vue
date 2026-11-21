<template>
  <div class="flex flex-row items-center gap-5 px-5 py-3" :class="{'opacity-75': programInPast}">
    <div class="flex flex-col items-center">
      <p class="text-accent text-sm uppercase">
        {{ formatDate(program.date, "MMM") }}
      </p>
      <p class="text-2xl font-serif">{{ formatDate(program.date, "DD") }}</p>
      <p v-if="showYear" class="text-accent text-xs">
        {{ formatDate(program.date, "YYYY") }}
      </p>
    </div>
    <div class="flex flex-col gap-1">
      <p class="flex max-md:flex-col items-start md:items-center gap-[inherit] md:gap-2 font-medium">
        <span
          :class="{
            'line-through': program.status === ProgramStatus.CANCELLED,
            italic: program.status === ProgramStatus.TENTATIVE,
          }"
        >
          {{ program.venue }}
        </span>
        <AppBadge
          v-for="badge in programBadges"
          :key="badge.text"
          :color="badge.color"
          size="xs"
          :text="badge.text"
          variant="tonal"
        />
      </p>
      <p>{{ program.location || "N/A" }}&ensp;&bullet;&ensp;{{ formatDate(program.date, "HH:mm") }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import type {AppBadgeProps} from "~/components/AppBadge.vue";

interface ProgramItemProps {
  program: Program;
}

const props = defineProps<ProgramItemProps>();

// TODO: Style program item based on date (requires client-side calculation)

// TODO: Ensure this is a client-side calculation
const showYear = computed(() => dayjs(props.program.date).year() !== dayjs().year());

const programInPast = computed(() => dayjs(props.program.date).isBefore(undefined, "day"));

const programBadges = computed(() => {
  const badges: AppBadgeProps[] = [];
  if (props.program.type === ProgramType.PARTIAL) {
    badges.push({text: "Partial", color: "warning"});
  } else if (props.program.type === ProgramType.LIVESTREAM) {
    badges.push({text: "Livestream", color: "warning"});
  }
  if (props.program.status === ProgramStatus.CANCELLED) {
    badges.push({text: "Cancelled", color: "error"});
  }
  return badges;
});
</script>
