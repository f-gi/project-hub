<script setup lang="ts">
import ProjectCard from "@/components/ui/ProjectCard.vue";
import ProjectListToolbar from "@/components/ui/ProjectListToolbar.vue";
import { useProjectStore } from "@/stores/project";
import type { Project } from "@/types/project";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

defineProps<{ projects: Project[] }>();

const store = useProjectStore();
const router = useRouter();

const onlyFavorites = ref(false);
const sort = ref<"alphabetical" | "start_desc" | "end_asc">("alphabetical");

function parseDate(value: string): number {
  if (!value) return Number.NaN;
  if (value.includes("/")) {
    const [dd, mm, yyyy] = value.split("/");
    return new Date(Number(yyyy), Number(mm) - 1, Number(dd)).getTime();
  }
  return new Date(value).getTime();
}

const totalCount = computed(() => store.projects.length);

const displayedProjects = computed(() => {
  let arr = store.projects.slice();

  if (onlyFavorites.value) {
    arr = arr.filter((p) => p.favorite);
  }

  if (sort.value === "alphabetical") {
    arr.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort.value === "start_desc") {
    arr.sort((a, b) => parseDate(b.startDate) - parseDate(a.startDate));
  } else {
    arr.sort((a, b) => parseDate(a.endDate) - parseDate(b.endDate));
  }

  return arr;
});

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
    <header
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
            ({{ totalCount }})
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

    <ul
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
    >
      <li v-for="p in displayedProjects" :key="p.id">
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
