<script setup lang="ts">
import ProjectSearch from "@/components/ui/ProjectSearch.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full h-header bg-secondary shadow-header z-50"
  >
    <div
      class="max-w-screen-xl mx-auto h-full flex items-center justify-between px-6"
    >
      <div
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2"
      >
        <img
          src="/logo.svg"
          alt="Logo do sistema Gerenciador de Projetos"
          class="w-[72px] h-[72px] object-cover"
        />
        <h1 class="text-white text-base leading-100p max-w-[109px]">
          Gerenciador de Projetos
        </h1>
      </div>
      <div v-if="route.path === '/'" class="ml-auto">
        <ProjectSearch />
      </div>
    </div>
  </header>
</template>
