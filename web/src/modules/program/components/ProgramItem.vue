<template>
  <!-- Dates are formatted in build timezone during static generation (patched to local timezone during hydration) -->
  <div class="flex flex-row items-center gap-5 px-5 py-3" data-allow-mismatch="text">
    <div class="flex flex-col items-center" :class="programRelativityDateTimeClasses">
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
            'italic opacity-75': program.status === ProgramStatus.TENTATIVE,
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
      <p v-if="program.address && !programInPast" class="text-xs opacity-80">
        {{ program.address }}
      </p>
      <p class="flex items-center gap-2">
        <span>{{ program.location || "N/A" }}</span>
        &bullet;
        <span :class="programRelativityDateTimeClasses">{{ formatDate(program.date, "HH:mm") }}</span>
        <template v-if="program.eventLink">
          &bullet;
          <AppButton
            :icon="appIcons.LinkIcon"
            size="xs"
            target="_blank"
            :to="program.eventLink"
            variant="text"
          />
        </template>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import type {AppBadgeProps} from "~/components/app-badge.types";

interface ProgramItemProps {
  program: Program;
}

const props = defineProps<ProgramItemProps>();

const now = useNow();

const showYear = computed(() => dayjs(props.program.date).year() !== dayjs(now.value).year());

const programInPast = computed(() => dayjs(props.program.date).isBefore(now.value, "day"));

/** Program date/time classes are based on relativity (ie. past/future) */
const programRelativityDateTimeClasses = computed(() => (programInPast.value ? "opacity-60" : "font-medium"));

const programBadges = computed(() => {
  const badges: AppBadgeProps[] = [];
  if (props.program.status === ProgramStatus.CANCELLED) {
    badges.push({text: "Cancelled", color: "danger"});
  } else if (props.program.status === ProgramStatus.TENTATIVE) {
    badges.push({text: "Pending", color: "accent"});
  }

  if (props.program.type === ProgramType.PARTIAL) {
    badges.push({text: "Partial", color: "accent"});
  } else if (props.program.type === ProgramType.LIVESTREAM) {
    badges.push({text: "Livestream", color: "accent"});
  }
  return badges;
});
</script>
