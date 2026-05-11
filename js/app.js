

import App from '../components/DevApp.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS


import { createApp } from 'vue';
import { createPluginPolyfill } from './plugin-polyfill.js';
import { createPinia } from 'pinia';
import router from './router.js';


setTimeout(() => {
    import('../../src/main.js').then((module) => {
        console.log('SpPS Plugin loaded successfully!');
    }, 1000);
});

createPluginPolyfill();
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
