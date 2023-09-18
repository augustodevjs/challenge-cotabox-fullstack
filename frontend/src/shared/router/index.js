import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../../views/home/HomeView.vue";
import GraphicView from "../../views/graphic/GraphicView.vue";

export const router = createRouter({
  history: createWebHistory(""),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/graphic",
      name: "graphic",
      component: GraphicView,
    },
  ],
});
