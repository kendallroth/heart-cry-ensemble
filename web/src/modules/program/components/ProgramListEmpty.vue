<template>
  <div class="flex items-center gap-2 italic opacity-80">
    <WarningFilledIcon :class="appIcons.sizeClasses.sm" />
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
interface ProgramListEmptyProps {
  text?: string;
}

withDefaults(defineProps<ProgramListEmptyProps>(), {
  text: "No programs listed",
});

const {WarningFilledIcon} = appIcons;
</script>
