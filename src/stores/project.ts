import { defineStore } from "pinia";
import type { Project } from "@/types/project";

const STORAGE_KEY = "projects";

function loadFromStorage(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Project[]) : [];
  } catch {
    return [];
  }
}

export const useProjectStore = defineStore("project", {
  state: () => ({
    projects: loadFromStorage() as Project[],
  }),
  getters: {
    getById: (state) => (id: string) => state.projects.find((p) => p.id === id),
    hasProjects: (state) => state.projects.length > 0,
  },
  actions: {
    save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.projects));
    },
    add(project: Project) {
      this.projects.push(project);
      this.save();
    },
    update(id: string, patch: Partial<Project>) {
      const idx = this.projects.findIndex((p) => p.id === id);
      if (idx === -1) return;
      this.projects[idx] = { ...this.projects[idx], ...patch };
      this.save();
    },
    remove(id: string) {
      this.projects = this.projects.filter((p) => p.id !== id);
      this.save();
    },
    toggleFavorite(id: string) {
      const p = this.getById(id);
      if (!p) return;
      p.favorite = !p.favorite;
      this.save();
    },
  },
});
