<script setup lang="ts">
import Header from "@/components/ui/Header.vue";
</script>

<template>
  <div class="bg-background min-h-screen">
    <Header />
    <main class="pt-header px-6">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
