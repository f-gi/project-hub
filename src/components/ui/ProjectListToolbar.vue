<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import { IconChevronDown, IconPlus } from "@tabler/icons-vue";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import type { RouteLocationRaw } from "vue-router";

const props = defineProps<{
  onlyFavorites: boolean;
  sort: "alphabetical" | "start_desc" | "end_asc";
  newTo: RouteLocationRaw;
}>();
const emit = defineEmits<{
  (e: "update:onlyFavorites", v: boolean): void;
  (e: "update:sort", v: "alphabetical" | "start_desc" | "end_asc"): void;
}>();

const isOpen = ref(false);
const dropdownId = "toolbar-sort-listbox";
const wrapperEl = ref<HTMLDivElement | null>(null);

function toggleOpen() {
  isOpen.value = !isOpen.value;
}
function close() {
  isOpen.value = false;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") close();
}
function onClickOutside(e: MouseEvent) {
  const el = wrapperEl.value;
  if (!el) return;
  if (!el.contains(e.target as Node)) close();
}
// Close dropdown on Esc and outside click (UX / accessibility)
onMounted(() => {
  document.addEventListener("keydown", onKeydown);
  document.addEventListener("mousedown", onClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeydown);
  document.removeEventListener("mousedown", onClickOutside);
});

const options = [
  { value: "alphabetical", label: "Ordem alfabética" },
  { value: "start_desc", label: "Iniciados mais recentes" },
  { value: "end_asc", label: "Prazo mais próximo" },
] as const;

const currentLabel = computed(
  () => options.find((o) => o.value === props.sort)?.label ?? options[0].label
);

function select(value: "alphabetical" | "start_desc" | "end_asc") {
  emit("update:sort", value);
  close();
}

function toggleFavorites() {
  emit("update:onlyFavorites", !props.onlyFavorites);
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 sm:gap-4">
    <button
      type="button"
      :aria-pressed="props.onlyFavorites ? 'true' : 'false'"
      @click="toggleFavorites"
      class="inline-flex items-center gap-3 w-full sm:w-auto"
    >
      <span
        class="relative inline-block h-6 w-11 rounded-full transition-colors"
        :class="props.onlyFavorites ? 'bg-yellow' : 'bg-secondary/70'"
        aria-hidden="true"
      >
        <span
          class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform"
          :class="props.onlyFavorites ? 'translate-x-5' : 'translate-x-0'"
        />
      </span>
      <span class="text-secondary">Apenas Favoritos</span>
    </button>

    <div class="relative w-full sm:w-[296px]" ref="wrapperEl">
      <button
        type="button"
        class="w-full h-10 rounded-md border border-primary bg-white px-4 text-secondary text-base flex items-center justify-between transition-[border-radius]"
        :class="isOpen ? 'rounded-b-none border-b-0' : ''"
        aria-haspopup="listbox"
        :aria-expanded="isOpen ? 'true' : 'false'"
        :aria-controls="dropdownId"
        @click="toggleOpen"
      >
        <span>{{ currentLabel }}</span>
        <IconChevronDown
          class="w-5 h-5 text-primary transition-transform"
          :class="isOpen ? 'rotate-180' : 'rotate-0'"
          aria-hidden="true"
        />
      </button>

      <div
        v-if="isOpen"
        :id="dropdownId"
        class="absolute left-0 top-full z-10 w-full rounded-b-xl rounded-t-none bg-white border border-primary border-t shadow-md overflow-hidden"
        role="listbox"
      >
        <ul class="divide-y divide-background">
          <li v-for="o in options" :key="o.value">
            <button
              type="button"
              class="w-full text-left px-4 py-3 hover:bg-primary/5 text-secondary text-base"
              role="option"
              :aria-selected="props.sort === o.value ? 'true' : 'false'"
              @click="select(o.value)"
            >
              {{ o.label }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <Button :to="props.newTo" class="rounded-full w-full sm:w-auto whitespace-nowrap justify-center">
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
</template>
