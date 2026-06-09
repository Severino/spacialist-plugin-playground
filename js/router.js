import { createRouter, createWebHistory } from 'vue-router';
import DevTabs from '../components/DevTabs.vue';

export default () => {
    const routes = [
        {
            path: '/',
            name: 'Home',
            component: DevTabs,
        }
    ];

    return createRouter({
        history: createWebHistory(),
        routes,
    });
};