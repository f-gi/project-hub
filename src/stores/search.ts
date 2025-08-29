import { defineStore } from "pinia";

const STORAGE_KEY = "search_history";
const MAX_ITEMS = 10;

function loadHistory(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter(
          (v): v is string => typeof v === "string" && v.trim().length > 0
        )
      : [];
  } catch (err) {
    console.error("Erro ao carregar histórico de busca:", err);
    return [];
  }
}

function saveHistory(items: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error("Erro ao salvar histórico de busca:", err);
  }
}

export const useSearchStore = defineStore("search", {
  state: () => ({
    active: false,
    query: "",
    history: loadHistory(),
  }),

  actions: {
    open() {
      this.active = true;
    },
    close() {
      this.active = false;
    },
    setQuery(text: string) {
      this.query = text;
    },

    addToHistory(term: string) {
      const t = term.trim();
      if (!t) return;
      this.history = [t, ...this.history.filter((i) => i !== t)].slice(
        0,
        MAX_ITEMS
      );
      saveHistory(this.history);
    },

    removeFromHistory(term: string) {
      this.history = this.history.filter((i) => i !== term);
      saveHistory(this.history);
    },
  },
});
