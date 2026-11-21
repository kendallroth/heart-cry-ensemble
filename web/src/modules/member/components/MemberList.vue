<template>
  <div class="flex flex-col gap-1 md:gap-2">
    <div class="text-2xl font-serif capitalize">{{ part }}</div>
    <template v-for="(member, memberIdx) in sortedMembers" :key="memberIdx">
      <hr class="text-primary/10" />
      <p class="text-sm">{{ member.name }}</p>
    </template>
  </div>
</template>

<script lang="ts" setup>
interface MemberListProps {
  members: Member[];
  part: string;
}

const props = defineProps<MemberListProps>();

const sortedMembers = computed(() => props.members.slice().sort((a, b) => a.name.localeCompare(b.name)));
</script>
