import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS

import { createApp } from 'vue';
import { createPluginMock } from './js/plugin-mock.js';
import { createPinia } from 'pinia';
import router from './js/router.js';
import { createI18n } from 'vue-i18n';


async function loadOptionalExport(path, exportName) {
    try {
        const mod = await import(/* @vite-ignore */ path);
        return mod[exportName];
    } catch (error) {
        console.warn(`Optional mock module not found: ${path}`);
        return undefined;
    }
}

export async function usePlayground() {

    const i18n = createI18n({
        locale: 'en',
        messages: {
            en: {},
            de: {},
        }
    })
    window.i18n = i18n;

    let mockRoutes, mockStores;

    mockRoutes = await loadOptionalExport('/mock/mock_routes.js', 'mockRoutes');
    mockStores = await loadOptionalExport('/mock/mock_stores.js', 'mockStores');

    createPluginMock({ routes: mockRoutes, stores: mockStores });
    const app = createApp(App);

    app.use(createPinia());
    app.use(i18n);
    app.use(router);

    app.mount('#app');

    return app;
}