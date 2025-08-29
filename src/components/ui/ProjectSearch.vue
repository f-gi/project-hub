<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import { useSearchStore } from "@/stores/search.ts";
import { IconHistory, IconSearch, IconX } from "@tabler/icons-vue";
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";

const store = useSearchStore();

const inputEl = ref<HTMLInputElement | null>(null);
const showHistory = ref(false);

const isOpen = computed(() => store.active);

function shouldShowHistory() {
  return store.history.length > 0 && store.query.trim().length === 0;
}

function open() {
  store.open();
  showHistory.value = shouldShowHistory();
  nextTick(() => inputEl.value?.focus());
}

function closeAndClear() {
  store.setQuery("");
  store.close();
  showHistory.value = false;
}

function onFocus() {
  showHistory.value = shouldShowHistory();
}

function onInput(e: Event) {
  store.setQuery((e.target as HTMLInputElement).value);
  showHistory.value = shouldShowHistory();
}

function onEnter() {
  const q = store.query.trim();
  if (q.length >= 3) store.addToHistory(q);
}

function pick(term: string) {
  store.setQuery(term);
  store.addToHistory(term);
  showHistory.value = false; 
}

function removeHistory(term: string) {
  store.removeFromHistory(term);
  showHistory.value = shouldShowHistory();
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") closeAndClear();
}
onMounted(() => document.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => document.removeEventListener("keydown", onKeydown));
</script>

<template>
  <div class="relative">
    <Button variant="ghost" size="icon" ariaLabel="Abrir busca" @click="open">
      <template #icon>
        <IconSearch class="w-[18px] h-[18px] text-white" aria-hidden="true" />
      </template>
    </Button>

    <div v-if="isOpen" class="fixed inset-x-0 top-0 z-[60]">
      <div class="bg-white border-b border-primary shadow-md">
        <div class="relative">
          <IconSearch
            class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary"
            aria-hidden="true"
          />
          <input
            ref="inputEl"
            :value="store.query"
            @focus="onFocus"
            @input="onInput"
            @keydown.enter.prevent="onEnter"
            class="w-full h-20 pl-10 pr-12 text-secondary placeholder:text-text/80 outline-none"
            type="text"
            placeholder="Digite o nome do projeto…"
            aria-describedby="search-help"
          />
          <button
            type="button"
            class="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-text hover:text-secondary"
            aria-label="Fechar busca"
            @click="closeAndClear"
          >
            <IconX class="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <ul
          v-if="showHistory && store.history.length"
          class="max-h-60 overflow-auto divide-y divide-background bg-white"
        >
          <li
            v-for="term in store.history"
            :key="term"
            class="flex items-center"
          >
            <button
              type="button"
              class="flex-1 flex items-center gap-3 px-4 py-3 text-secondary hover:bg-primary/5 text-left"
              @click="pick(term)"
            >
              <IconHistory class="w-4 h-4 text-text" aria-hidden="true" />
              <span>{{ term }}</span>
            </button>
            <button
              type="button"
              class="px-4 py-3 text-text hover:text-error"
              aria-label="Remover do histórico"
              @click="removeHistory(term)"
            >
              <IconX class="w-4 h-4" aria-hidden="true" />
            </button>
          </li>
        </ul>
      </div>

      <p id="search-help" class="sr-only">
        Pressione Enter para buscar. Mínimo de 3 caracteres.
      </p>
    </div>
  </div>
</template>
