<script setup lang="ts">
import ProjectCard from "@/components/ui/ProjectCard.vue";
import { useProjectStore } from "@/stores/project";
import type { Project } from "@/types/project";
import { RouterLink, useRouter } from "vue-router";

defineProps<{ projects: Project[] }>();

const store = useProjectStore();
const router = useRouter();

function confirmAndRemove(projectId: string) {
  if (confirm("Deseja remover este projeto?")) {
    store.remove(projectId);
  }
}
</script>

<template>
  <section
    class="max-w-screen-xl mx-auto px-6 py-8"
    aria-labelledby="projects-heading"
  >
    <header class="flex items-center justify-between mb-4">
      <h2 id="projects-heading" class="text-heading text-lg font-semibold">
        Projetos
      </h2>
      <RouterLink
        :to="{ name: 'ProjectCreate' }"
        class="text-primary underline underline-offset-4"
      >
        Novo projeto
      </RouterLink>
    </header>

    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <li v-for="p in projects" :key="p.id">
        <ProjectCard
          :title="p.name"
          :client="p.client"
          :startDate="p.startDate"
          :endDate="p.endDate"
          :cover="p.image"
          :isFavorite="p.favorite"
          @toggle-favorite="store.toggleFavorite(p.id)"
          @edit="router.push({ name: 'ProjectEdit', params: { id: p.id } })"
          @delete="confirmAndRemove(p.id)"
        />
      </li>
    </ul>
  </section>
</template>
