import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS

import { createApp } from 'vue';
import { createPluginMock } from './js/plugin-mock.js';
import { createPinia } from 'pinia';
import useRouter from './js/router.js';
import { createI18n } from 'vue-i18n';

export async function usePlayground({
    api = {},
    components = [],
    extras = {},
    pinia = null,
    http = () => { },
    routes = [],
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
    window.playgroundPinia = pinia;

    components.forEach(({component, name}) => app.component(name, component));

    app.use(pinia);
    app.use(i18n);
    createPluginMock({ pinia, http, stores, extras, api, });
    app.use(useRouter(routes));


    app.mount('#app');

    return app;
}