<template>
  <PageLayout class="py-4">
    <PageWidth class="flex-col gap-4">
      <div v-for="color in colors" :key="color" class="flex gap-3 items-center">
        <AppButton
          v-for="variant in variants"
          :key="variant"
          :color="color"
          disabled
          :text="`${color} ${variant}`"
          :variant="variant"
        />
      </div>
      <div class="flex gap-3 items-center">
        <AppButton :icon="appIcons.PlayIcon" />
        <AppButton :icon-prepend="appIcons.PlayIcon" rounded="md" text="Prepend" />
        <AppButton
          :icon-append="appIcons.OpenIcon"
          target="_blank"
          to="https://example.com"
          variant="outlined"
        >
          External
        </AppButton>
        <AppButton color="accent" to="/seasons" variant="tonal">Internal</AppButton>
        <AppButton disabled>Disabled</AppButton>
        <AppButton disabled variant="outlined">Disabled</AppButton>
        <AppButton disabled to="/seasons">Disabled link</AppButton>
        <AppButton color="error" readonly>Readonly</AppButton>
        <AppButton color="gold" text-color="#000">Gold override</AppButton>
      </div>
      <div class="flex gap-3 items-center">
        <template v-for="size in sizes" :key="size">
          <AppButton :icon-prepend="appIcons.PlayIcon" :size="size" :text="size" />
          <AppButton :icon="appIcons.PlayIcon" :size="size" :text="size" />
          <AppButton :icon="appIcons.PlayIcon" :size="size" :text="size" variant="outlined" />
        </template>
      </div>
      <AppButton block rounded="none">Block</AppButton>
    </PageWidth>
  </PageLayout>
</template>

<script lang="ts" setup>
const colors = ["primary", "accent", "error", "#e91e63", "gold"];
const sizes = ["sm", "md", "lg"] as const;
const variants = ["elevated", "flat", "tonal", "outlined", "text"] as const;
</script>
