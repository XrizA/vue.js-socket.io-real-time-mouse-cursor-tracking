import Home from "@/views/Home.vue";
import About from "@/views/About.vue";

export const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/dashboard/",
    name: "dashboard",
    component: About,
  },
];
