import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap'; // Import Bootstrap JS

import { createApp } from 'vue';
import { createPluginMock } from './js/plugin-mock.js';
import { createPinia } from 'pinia';
import useRouter from './js/router.js';
import { createI18n } from 'vue-i18n';

/**
 * Initializes the playground's Vue application with the provided configuration options.
 * 
 * @param {Object} options - The configuration options for the playground.
 * @param {Object} [options.api={}] - Custom API methods to be added to the SpPS object. Some api values should be set using their respective options (e.g., store, http, router, modal) and will be ignored if set here.
 * @param {Array} [options.components=[]] - An array of components to be registered globally.
 * @param {import('pinia').Pinia} [options.pinia=null] - The Pinia instance to be used by the playground app.
 * @param {function} [options.http=() => {}] - A mock implementation of the http function.
 * @param {Object} [options.stores={}] - Mock stores to be used for the store.
 * @param {Array} [options.routes=null] - An array of routes to be used by the router, it will use a new router instance. This only has effect, when no router instance is provided.
 * @param {import('vue-router').Router} [options.router=null] - The router instance to be used by the playground app. This will override the routes option, if provided.
 * @param {string} [options.i18nLocale='en'] - The default locale for internationalization.
 * @param {Object} [options.i18nMessages={ en: {}, de: {} }] - The messages for internationalization in different locales.
 * @param {Object} [options.extras={}] - Additional properties to be added to the SpPS object.
 * @returns {import('vue').App} The initialized Vue application instance.
 */
export function usePlayground({
    api = {},
    components = [],
    extras = {},
    pinia = null,
    http = () => { },
    stores = {},
    routes = null,
    router = null,
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
    window.t = window.i18n.global.t;

    const app = createApp(App);

    if (!pinia) {
        pinia = createPinia();
    }
    window.playgroundPinia = pinia;

    components.forEach(({ component, name }) => app.component(name, component));

    app.use(pinia);
    app.use(i18n);

    if (!router) {
        if (!routes) {
            throw new Error("Either router or routes must be provided.");
        }
        router = useRouter(routes)
    }

    createPluginMock({ pinia, router, http, stores, extras, api, });
    app.use(router);


    app.mount('#app');

    return app;
}