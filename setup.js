import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS

import { createApp } from 'vue';
import { createPluginMock } from './js/plugin-mock.js';
import { createPinia } from 'pinia';
import useRouter from './js/router.js';
import { createI18n } from 'vue-i18n';
import {setPinia} from './js/store.js';

export async function usePlayground({
    pinia = null,
    router = null,
    routes = {},
    stores = {},
    i18nLocale = 'en',
    i18nMessages = {
        en: {},
        de: {}
    }
} = {}) {

    const i18n = createI18n({
        locale: i18nLocale,
        messages: i18nMessages
    })
    window.i18n = i18n;


    const app = createApp(App);

    if (!pinia) {
        pinia = createPinia();
    }

    if (!router) {
        router = useRouter();
    }
    console.log('Pinia instance created:', pinia);

    console.log('Set pinia instance');
    setPinia(pinia);
    app.use(pinia);
    app.use(i18n);
    app.use(router);

    createPluginMock({ pinia, router, routes, stores });

    app.mount('#app');

    return app;
}