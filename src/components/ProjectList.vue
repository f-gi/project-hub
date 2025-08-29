<script setup lang="ts">
import ProjectCard from "@/components/ui/ProjectCard.vue";
import ProjectListToolbar from "@/components/ui/ProjectListToolbar.vue";
import { useProjectStore } from "@/stores/project";
import { useSearchStore } from "@/stores/search";
import type { Project } from "@/types/project";
import { IconArrowLeft } from "@tabler/icons-vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import { dateToTimestamp } from "@/utils/date";
import { normalizeText } from "@/utils/string";

defineProps<{ projects: Project[] }>();

const projectStore = useProjectStore();
const searchStore = useSearchStore();
const router = useRouter();

const onlyFavorites = ref(false);
const sort = ref<"alphabetical" | "start_desc" | "end_asc">("alphabetical");

const MIN_SEARCH_CHARS = 3;
const searchQuery = computed(() => searchStore.query.trim());
const hasSearchQuery = computed(
  () => searchQuery.value.length >= MIN_SEARCH_CHARS
);

const totalProjectsCount = computed(() => projectStore.projects.length);

const visibleProjects = computed(() => {
  let list = projectStore.projects.slice();

  if (hasSearchQuery.value) {
    const q = normalizeText(searchQuery.value);
    list = list.filter((p) => normalizeText(p.name).includes(q));
  }

  if (!hasSearchQuery.value && onlyFavorites.value) {
    list = list.filter((p) => p.favorite);
  }

  if (sort.value === "alphabetical") {
    list.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  } else if (sort.value === "start_desc") {
    list.sort(
      (a, b) => dateToTimestamp(b.startDate) - dateToTimestamp(a.startDate)
    );
  } else {
    list.sort(
      (a, b) => dateToTimestamp(a.endDate) - dateToTimestamp(b.endDate)
    );
  }

  return list;
});

function openEdit(projectId: string) {
  router.push({ name: "ProjectEdit", params: { id: projectId } });
}

function confirmAndRemove(projectId: string) {
  if (confirm("Deseja remover este projeto?")) {
    projectStore.remove(projectId);
  }
}

function backFromSearch() {
  searchStore.setQuery("");
  searchStore.close();
}
</script>

<template>
  <section
    class="max-w-screen-xl mx-auto px-6 py-8"
    aria-labelledby="projects-heading"
  >
    <header
      v-if="!hasSearchQuery"
      class="sticky top-0 z-40 bg-background/90 supports-[backdrop-filter]:bg-background/60 backdrop-blur px-6 py-3 rounded-md"
    >
      <div
        class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <h2
          id="projects-heading"
          class="text-heading text-lg font-semibold flex items-center gap-2"
        >
          Projetos
          <span class="inline-block text-base leading-100p text-primary">
            ({{ totalProjectsCount }})
          </span>
        </h2>

        <div class="w-full sm:w-auto">
          <ProjectListToolbar
            v-model:onlyFavorites="onlyFavorites"
            v-model:sort="sort"
            :newTo="{ name: 'ProjectCreate' }"
            class="w-full"
          />
        </div>
      </div>
    </header>

    <header
      v-else
      class="sticky top-0 z-40 bg-background/90 supports-[backdrop-filter]:bg-background/60 backdrop-blur px-6 py-4 rounded-md"
    >
      <button
        type="button"
        class="inline-flex items-center gap-2 text-primary hover:underline mb-3"
        @click="backFromSearch"
      >
        <IconArrowLeft class="w-5 h-5" aria-hidden="true" />
        Voltar
      </button>

      <h2 class="text-heading text-lg font-semibold">Resultado da busca</h2>
    </header>

    <p class="sr-only" aria-live="polite">
      {{ visibleProjects.length }} projetos visíveis na lista.
    </p>

    <ul
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
    >
      <li v-for="p in visibleProjects" :key="p.id">
        <ProjectCard
          :title="p.name"
          :client="p.client"
          :startDate="p.startDate"
          :endDate="p.endDate"
          :cover="p.image"
          :isFavorite="p.favorite"
          @toggle-favorite="projectStore.toggleFavorite(p.id)"
          @edit="openEdit(p.id)"
          @delete="confirmAndRemove(p.id)"
        />
      </li>
    </ul>
  </section>
</template>
