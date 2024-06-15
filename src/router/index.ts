import HomePage from "@/modules/landing/pages/HomePage.vue";
import NotFound404 from "@/modules/common/pages/NotFound404.vue";
import { createRouter, createWebHistory } from "vue-router";
import isAuhtenticatedGuard from "@/modules/auth/guards/is-authenticated.guard";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/:pathMatch(.*)*", // 404
            component: NotFound404
        },
        {
            path: "/",
            name: 'landing',
            component: () => import("@/modules/landing/layouts/LandingLayout.vue"),
            children: [
                {
                    path: "/",
                    name: "home",
                    component: HomePage
                },
                {
                    path: "/features",
                    name: "features",
                    component: () => import("@/modules/landing/pages/FeaturesPage.vue")
                },
                {
                    path: "/pricing",
                    name: "pricing",
                    component: () => import("@/modules/landing/pages/PricingPage.vue")
                },
                {
                    path: "/contact",
                    name: "contact",
                    component: () => import("@/modules/landing/pages/ContactPage.vue")
                },
                {
                    path: "/pokemon/:id",
                    name: "pokemon",
                    beforeEnter: [isAuhtenticatedGuard],
                    props: (route) => {
                        const id = Number(route.params.id)
                        return isNaN(id) ? { id: 1 } : { id };
                    },
                    component: () => import("@/modules/pokemons/pages/PokemonPage.vue")
                },
            ]
        },
        {
            path: "/auth",
            name: "auth",
            redirect: { name: "login" },
            component: () => import("@/modules/auth/layouts/AuthLayout.vue"),
            children: [
                {
                    path: "login",
                    name: "login",
                    component: () => import("@/modules/auth/pages/LoginPage.vue")
                },
                {
                    path: "register",
                    name: "register",
                    component: () => import("@/modules/auth/pages/RegisterPage.vue")
                },
            ]
        },
    ]
});

export default router;