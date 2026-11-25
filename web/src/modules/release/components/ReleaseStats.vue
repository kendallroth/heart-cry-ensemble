<template>
  <TextListBulleted>
    <span v-if="stats.includes('type')">{{ releaseLabelMap[release.type] }}</span>
    <span
      v-if="stats.includes('date')"
      class="flex items-center gap-1"
      :class="{'italic opacity-80': !recordingReleaseStatus.released}"
    >
      <WarningFilledIcon
        v-if="!recordingReleaseStatus.released"
        class="text-on-background"
        :class="appIcons.sizeClasses.sm"
      />
      {{ recordingReleaseStatus.date }}
    </span>
    <span v-if="showTrackCount">{{ release.trackCount }} tracks</span>
  </TextListBulleted>
</template>

<script lang="ts" setup>
import {releaseLabelMap, isReleasePublished} from "~/modules/release/release.utils";

type ReleaseStatTypes = "date" | "tracks" | "type";

interface ReleaseStatsProps {
  release: MusicRelease;
  stats?: ReleaseStatTypes[];
}

const props = withDefaults(defineProps<ReleaseStatsProps>(), {
  stats: () => ["type", "date", "tracks"],
});

const now = useNow();

const {WarningFilledIcon} = appIcons;

// Single-track releases are self-evident (no need for count)
const showTrackCount = computed(() => props.stats.includes("tracks") && (props.release.trackCount ?? 0) > 1);

const recordingReleaseStatus = computed<{date: string; released: boolean}>(() => {
  if (!props.release.releaseDate) {
    return {date: "Unreleased", released: false};
  }
  const released = isReleasePublished(props.release, now.value);
  return {date: formatDate(props.release.recordDate, "YYYY"), released};
});
</script>
