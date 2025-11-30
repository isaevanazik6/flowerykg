import { createRouter, createWebHistory } from "vue-router";
import {ROUTE_PATHS} from "@/router/paths.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTE_PATHS.HOME,
      name: "home",
      component: () => import("@/pages/HomePage.vue"),
    },
    {
      path: ROUTE_PATHS.CATALOG,
      name: "catalog",
      component: () => import("@/pages/CatalogPage.vue"),
    },
    {
      path: "/bouquet/:id",
      name: "bouquet",
      component: () => import("@/pages/BouquetPage.vue"),
      props: true,
    },
    {
      path: ROUTE_PATHS.ABOUT,
      name: "about",
      component: () => import("@/pages/AboutPage.vue"),
    },
    {
      path: ROUTE_PATHS.DELIVERY,
      name: "delivery",
      component: () => import("@/pages/DeliveryPage.vue"),
    },
    {
      path: ROUTE_PATHS.CONTACTS,
      name: "contacts",
      component: () => import("@/pages/ContactsPage.vue"),
    },
    {
      path: ROUTE_PATHS.FAVORITES,
      name: "favorites",
      component: () => import("@/pages/FavoritesPage.vue"),
    },
    {
      path: ROUTE_PATHS.CART,
      name: "cart",
      component: () => import("@/pages/CartPage.vue"),
    },
  ],
});

export default router;
