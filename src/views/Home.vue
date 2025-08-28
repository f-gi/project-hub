<script setup lang="ts">
import EmptyState from "@/components/EmptyState.vue";
import ProjectList from "@/components/ProjectList.vue";
import { useProjectStore } from "@/stores/project";

const projectStore = useProjectStore();
</script>

<template>
  <div>
    <EmptyState v-if="!projectStore.hasProjects" />
    <ProjectList v-else :projects="projectStore.projects" />
  </div>
</template>
