import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { readFileSync } from 'fs';


// Check if Vite is running in development mode
const isDev = process.env.NODE_ENV === 'development';
export default defineConfig({
    plugins: [vue()],
    define: {
        // Sometimes dependencies require the NODE_ENV which is not provided by Vite
        // this will set the process env for all imports (currently required for vee-validate)
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
        'process.env': {}
    },
    server: {
        // Serve assets directory only in dev server
        publicDir: 'public',
        middlewareMode: false,
    }
});
