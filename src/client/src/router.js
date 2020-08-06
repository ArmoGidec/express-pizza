import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue')
        },
        {
            path: '/order',
            name: 'order',
            component: () => import('./views/Order.vue')
        },
        {
            path: '/auth',
            name: 'auth',
            component: () => import('./views/Auth.vue')
        }
    ]
});

export default router;
