import { defineStore } from 'pinia';
import { markRaw } from 'vue';

export const useAppStore = () => {
    return _useAppStore(window.playgroundPinia);
}

export const _useAppStore = defineStore('appStore', {
    state: () => ({
        activeTab: null,
        components: [],
        tabs: [],
        settings: [],
        tools: [],
        preferences: [],
    }),
    actions: {
        setActiveTab(tab) {
            this.activeTab = tab;
        },
        addTab(tab) {
            if(tab.component) {
                markRaw(tab.component)
            }

            if(this.tabs.length == 0) {
                this.activeTab = tab;
            }
            this.tabs.push(tab);
        },
        registerComponent(obj) {
            this.components.push(obj);
        }
    },
});