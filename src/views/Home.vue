<script setup lang="ts">
import EmptyState from "@/components/EmptyState.vue";
import { useProjectStore } from "@/stores/project";

const projectStore = useProjectStore();
</script>

<template>
  <div>
    <EmptyState v-if="projectStore.projects.length === 0" />
  </div>
</template>
