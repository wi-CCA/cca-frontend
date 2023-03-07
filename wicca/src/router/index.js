import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
            component: () => import('../views/WelcomeView.vue')
        },
        {
            path: '/explore',
            name: 'explore',
            component: () => import('../views/ExploreView.vue')
        }
    ]
})

export default router