<template>
  <div class="flex flex-col gap-0.5 md:gap-1">
    <div class="text-2xl font-serif capitalize">{{ part }}</div>
    <p v-for="(member, memberIdx) in sortedMembers" :key="memberIdx" class="text">{{ member.name }}</p>
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
