// src/router/index.ts
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Home from "@/views/Home.vue";
import ProjectCreateEdit from "@/views/ProjectCreateEdit.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/projects/new",
    name: "ProjectCreate",
    component: ProjectCreateEdit,
  },
  {
    path: "/projects/:id/edit",
    name: "ProjectEdit",
    component: ProjectCreateEdit,
    props: true,
  },
];

export default createRouter({ history: createWebHistory(), routes });
