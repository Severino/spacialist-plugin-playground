import { createRouter, createWebHistory } from 'vue-router';
import DevTabs from '../components/DevTabs.vue';
import DevStore from '../components/DevStore.vue';
import DevPage from '../components/DevPage.vue';

export default (pluginRoutes) => {
    const routes = [
        {
            path: '/',
            name: 'Home',
            component: DevTabs,
        }, {
            path: '/store/:name',
            name: 'Store',
            component: DevStore,
            props: true,
        }, {
            path: '/tools/:id',
            name: 'Tools',
            component: DevPage,
            props: true,
        },
        ...pluginRoutes
    ];

    return createRouter({
        history: createWebHistory(),
        routes,
    });
};