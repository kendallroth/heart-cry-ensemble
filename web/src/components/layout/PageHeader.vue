<template>
  <div class="bg-primary text-on-primary flex flex-col items-center">
    <PageWidth align="center" class="grid gap-8 py-6 md:py-10" :class="{'md:grid-cols-2': slots.media}">
      <div class="flex flex-col gap-6">
        <AppButton
          v-if="backText || backRoute"
          class="w-fit -mt-4 -mb-2"
          color="on-primary"
          :icon-prepend="appIcons.ArrowLeftIcon"
          size="sm"
          :text="backText || 'Back'"
          :to="backRoute"
          variant="text"
          @click="handleBack"
        />
        <div class="text-accent-light uppercase">{{ subtitle }}</div>
        <h2 :alt="title" class="text-6xl font-serif" :class="titleClass">
          <slot name="title" v-bind="{title}">
            {{ title }}
          </slot>
        </h2>
        <slot name="default" />
      </div>
      <slot name="media" />
    </PageWidth>
  </div>
</template>

<script lang="ts" setup>
import type {HTMLAttributes} from "vue";
import {useRouter, type RouteLocationRaw} from "vue-router";

interface PageHeaderProps {
  /** @deprecated Prefer always redirecting to previous page */
  backRoute?: RouteLocationRaw;
  backText?: string;
  subtitle: string;
  /** NOTE: Title is always required (even if not shown) for accessibility */
  title: string;
  titleClass?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<PageHeaderProps>(), {
  backRoute: undefined,
  backText: undefined,
  titleClass: undefined,
});

const slots = defineSlots<{
  default: () => unknown;
  title?: (props: {title: string}) => unknown;
  media?: () => unknown;
}>();

const router = useRouter();

const handleBack = () => {
  if (props.backRoute) return;

  router.back();
};
</script>
