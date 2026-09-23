import { createRouter, createWebHistory } from 'vue-router';
import DevTabs from '../components/DevTabs.vue';
import DevStore from '../components/DevStore.vue';

export default (pluginRoutes) => {
    const routes = [
        {
            path: '/',
            name: 'Home',
            component: DevTabs,
        },{
            path: '/store/:name',
            name: 'Store',
            component: DevStore,
            props: true,
        },
        ...pluginRoutes
    ];

    return createRouter({
        history: createWebHistory(),
        routes,
    });
};