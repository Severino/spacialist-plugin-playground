import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS

import { createApp } from 'vue';
import { createPluginMock } from './js/plugin-mock.js';
import { createPinia } from 'pinia';
import router from './js/router.js';
import { createI18n } from 'vue-i18n';

export async function usePlayground({
    routes = {},
    stores = {},
    i18nLocale = 'en',
    i18nMessages = {
        en: { },
        de: { }
    }
} = {}) {

    const i18n = createI18n({
        locale: i18nLocale,
        messages: i18nMessages
    })
    window.i18n = i18n;


    createPluginMock({ routes, stores });
    const app = createApp(App);

    app.use(createPinia());
    app.use(i18n);
    app.use(router);

    app.mount('#app');

    return app;
}