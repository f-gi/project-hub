<template>
  <section
    class="min-h-[calc(100vh-80px)] bg-white rounded-md shadow-sm grid place-items-center my-20 mx-10"
  >
    <div class="text-center flex flex-col items-center gap-6 px-12 py-16">
      <h2 class="text-heading text-xl font-semibold leading-100p">
        Nenhum projeto
      </h2>

      <p class="text-text text-sm leading-tight">
        Clique no botão abaixo para criar o primeiro e gerenciá-lo.
      </p>

      <Button
        class="w-[230px] text-md leading-tight font-normal"
        :to="{ name: 'ProjectCreate' }"
      >
        <template #icon>
          <span
            class="w-5 h-5 rounded-full border border-white grid place-items-center"
            aria-hidden="true"
          >
            <IconPlus class="w-3.5 h-3.5 text-white" aria-hidden="true" />
          </span>
        </template>
        Novo projeto
      </Button>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import { IconPlus } from "@tabler/icons-vue";
</script>
