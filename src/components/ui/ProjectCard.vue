<script setup lang="ts">
import CoverPlaceholder from "@/assets/cover-placeholder.svg";
import Button from "@/components/ui/Button.vue";
import { formatDatePt } from "@/utils/date";
import {
    IconCalendar,
    IconCalendarCheck,
    IconDots,
    IconPencil,
    IconStar,
    IconStarFilled,
    IconTrash,
} from "@tabler/icons-vue";
import { ref } from "vue";

withDefaults(
  defineProps<{
    title: string;
    client: string;
    startDate: string;
    endDate: string;
    cover?: string;
    isFavorite: boolean;
  }>(),
  { cover: undefined }
);

const emit = defineEmits<{
  (e: "toggle-favorite"): void;
  (e: "edit"): void;
  (e: "delete"): void;
}>();

const isMenuOpen = ref(false);
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
const closeMenu = () => (isMenuOpen.value = false);
</script>

<template>
  <article
    class="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col max-w-[346px] w-full"
  >
    <header class="relative">
      <figure v-if="cover" class="w-full aspect-[346/231]">
        <img
          :src="cover"
          alt="Capa do projeto"
          class="h-full w-full object-cover"
        />
      </figure>

      <figure v-else class="w-full aspect-[346/231]">
        <img
          :src="CoverPlaceholder"
          alt="Capa padrão do projeto"
          class="h-full w-full object-cover"
        />
      </figure>

      <div class="absolute right-3 bottom-3 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          ariaLabel="Alternar favorito"
          @click.stop="emit('toggle-favorite')"
        >
          <template #icon>
            <span class="relative inline-block w-5 h-5">
              <IconStar
                class="absolute inset-0 w-5 h-5 text-white"
                :stroke-width="2"
                aria-hidden="true"
              />
              <IconStarFilled
                v-if="isFavorite"
                class="absolute inset-0 m-0.5 w-4 h-4 text-yellow"
                aria-hidden="true"
              />
            </span>
          </template>
        </Button>

        <div class="relative">
          <Button
            variant="ghost"
            size="icon"
            ariaLabel="Abrir menu de opções"
            @click.stop="toggleMenu"
            class="rounded-full w-10 h-10 p-0 grid place-items-center !bg-white hover:!bg-white/90"
          >
            <template #icon>
              <IconDots :size="24" class="text-primary" aria-hidden="true" />
            </template>
          </Button>

          <div
            v-if="isMenuOpen"
            role="menu"
            class="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-md p-2 z-10"
            @keydown.esc.stop="closeMenu"
          >
            <Button
              variant="ghost"
              class="w-full justify-start px-3 py-2 rounded-lg text-heading hover:bg-primary/5"
              ariaLabel="Editar projeto"
              @click.stop="closeMenu(), emit('edit')"
            >
              <template #icon>
                <IconPencil class="w-4 h-4" aria-hidden="true" />
              </template>
              Editar projeto
            </Button>

            <Button
              variant="ghost"
              class="mt-1 w-full justify-start px-3 py-2 rounded-lg text-error hover:bg-error/5"
              ariaLabel="Excluir projeto"
              @click.stop="closeMenu(), emit('delete')"
            >
              <template #icon>
                <IconTrash class="w-4 h-4" aria-hidden="true" />
              </template>
              Excluir projeto
            </Button>
          </div>
        </div>
      </div>
    </header>

    <section class="p-4 border-t">
      <h3 class="font-bold text-md text-heading mb-1">{{ title }}</h3>

      <p class="text-sm flex items-baseline gap-1">
        <span class="font-bold text-text">Cliente:</span>
        <span class="text-text">{{ client }}</span>
      </p>

      <hr class="my-3 border-background" />

      <dl class="space-y-2 text-text text-sm">
        <div class="flex items-center gap-2">
          <dt class="sr-only">Data de início</dt>
          <IconCalendar class="w-5 h-5" aria-hidden="true" />
          <dd>{{ formatDatePt(startDate) }}</dd>
        </div>
        <div class="flex items-center gap-2">
          <dt class="sr-only">Data final</dt>
          <IconCalendarCheck class="w-5 h-5" aria-hidden="true" />
          <dd>{{ formatDatePt(endDate) }}</dd>
        </div>
      </dl>
    </section>
  </article>
</template>
