import { createRouter, createWebHistory } from 'vue-router';
import DevTabs from '../components/DevTabs.vue';

export default (routes) => {
    const routes = [
        {
            path: '/',
            name: 'Home',
            component: DevTabs,
        },
        ...routes
    ];

    return createRouter({
        history: createWebHistory(),
        routes,
    });
};