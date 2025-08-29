<script setup lang="ts">
import Header from "@/components/ui/Header.vue";
</script>

<template>
  <div class="bg-background min-h-screen">
    <Header />
    <main
      class="pt-header h-[calc(100vh)] overflow-y-auto bg-background overscroll-contain scroll-pb-10 py-16 px-10"
    >
      <RouterView />
    </main>
  </div>
</template>
