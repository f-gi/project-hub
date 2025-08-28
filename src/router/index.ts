import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import Home from "@/views/Home.vue";
import ProjectCreate from "@/views/ProjectCreate.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/projects/new",
    name: "ProjectCreate",
    component: ProjectCreate,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
