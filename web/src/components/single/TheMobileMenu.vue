<template>
  <!-- Native modal dialog provides focus containment, Escape handling, top layer, and focus restore -->
  <dialog
    ref="dialogRef"
    aria-label="Main menu"
    class="mobile-menu fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-[80vw] max-w-[350px] bg-primary text-on-primary"
    @click="handleDialogClick"
    @close="open = false"
  >
    <div class="flex flex-col gap-6 h-full p-4">
      <div class="flex items-center gap-2">
        <span class="text-lg font-medium">Menu</span>
        <ThemeToggleButton class="ml-auto" />
        <AppButton
          color="on-primary"
          :icon="CloseIcon"
          text="Close menu"
          variant="text"
          @click="open = false"
        />
      </div>

      <nav class="flex flex-col gap-1">
        <AppButton
          v-for="link in links"
          :key="link.label"
          active-class="font-semibold"
          class="justify-start!"
          color="on-primary"
          :text="link.label"
          :to="link.path"
          variant="text"
          @click="open = false"
        />
      </nav>

      <div class="flex flex-col mt-auto gap-4">
        <AppButton
          color="accent-light"
          target="_blank"
          text="Host a program"
          :to="`mailto:${publicConfig.email}?subject=Host a program`"
        />
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import {useScrollLock} from "@vueuse/core";

import type {AppLink} from "./TheAppHeader.vue";

interface TheMobileMenuProps {
  links: AppLink[];
}

defineProps<TheMobileMenuProps>();

const open = defineModel<boolean>("open", {default: false});

const publicConfig = useRuntimeConfig().public;
const route = useRoute();

const {CloseIcon} = appIcons;

const dialogRef = useTemplateRef<HTMLDialogElement>("dialogRef");
const scrollLocked = useScrollLock(import.meta.client ? document.body : null);

watch(open, (newValue) => {
  const dialog = dialogRef.value;
  if (!dialog) return;

  if (newValue && !dialog.open) {
    dialog.showModal();
  } else if (!newValue && dialog.open) {
    dialog.close();
  }

  scrollLocked.value = newValue;
});

// Close mobile menu when navigating (covers links not triggered by clicking within menu)
watch(
  () => route.fullPath,
  () => {
    open.value = false;
  },
);

/** Close when clicking the backdrop (only the dialog itself, as content fills the panel) */
const handleDialogClick = (event: MouseEvent) => {
  if (event.target === dialogRef.value) {
    open.value = false;
  }
};
</script>

<style scoped>
/* Slide in/out (requires '@starting-style' and discrete transitions to animate 'display') */
.mobile-menu,
.mobile-menu::backdrop {
  transition-property: translate, opacity, display, overlay;
  transition-duration: 200ms;
  transition-timing-function: ease-out;
  transition-behavior: allow-discrete;
}

.mobile-menu {
  translate: 100% 0;
}

.mobile-menu::backdrop {
  background-color: rgb(0 0 0 / 0.5);
  opacity: 0;
}

.mobile-menu[open] {
  translate: 0 0;
}

.mobile-menu[open]::backdrop {
  opacity: 1;
}

@starting-style {
  .mobile-menu[open] {
    translate: 100% 0;
  }

  .mobile-menu[open]::backdrop {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mobile-menu,
  .mobile-menu::backdrop {
    transition: none;
  }
}
</style>
