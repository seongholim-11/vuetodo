import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Todos from "../views/todos/index.vue";
import Todo from "../views/todos/_id.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/todos",
        name: "todos",
        component: Todos,
    },
    {
        path: "/todos/:id",
        name: "todo",
        component: Todo,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
