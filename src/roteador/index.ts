import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tarefas from "../views/Tarefas.vue";

const rotas: RouteRecordRaw[] = [{
    path: '/',
    name: 'Tarefas',
    component: Tarefas
},
    {
        path: '/projetos',
        name: 'Projetos',
        component: () => import('../views/Projetos.vue'),
    }
]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador;