import { createRouter, createWebHistory } from 'vue-router';
import DevTabs from '../components/DevTabs.vue';

export default (pluginRoutes) => {
    const routes = [
        {
            path: '/',
            name: 'Home',
            component: DevTabs,
        },
        ...pluginRoutes
    ];

    return createRouter({
        history: createWebHistory(),
        routes,
    });
};