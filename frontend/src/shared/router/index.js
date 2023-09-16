import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../../views/HomeView.vue";
import GraphicView from "../../views/GraphicView.vue";

const router = createRouter({
  history: createWebHistory(""),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/graphic",
      name: "graphic",
      component: GraphicView
    }
  ]
});

export default router;
