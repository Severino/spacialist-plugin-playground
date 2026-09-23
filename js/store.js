import { defineStore } from 'pinia';
import { markRaw } from 'vue';

export const useAppStore = () => {
    return _useAppStore(window.playgroundPinia);
}

export const _useAppStore = defineStore('appStore', {
    state: () => ({
        pluginId: null,
        pluginRoute: null,
        router: null,
        activeTab: null,
        modalAttributes: {},
        modalComponent: null,
        isModalOpen: false,
        components: [],
        tabs: [],
        settings: [],
        tools: [],
        preferences: [],
        stores: [],
    }),
    actions: {
        setRouter(router){
            this.router = router
        },
        registerPlugin(pluginId){
            if(this.pluginId) {
                if(this.pluginId === pluginId){
                    console.warn("Registering same plugin again!", pluginId)
                } else {
                    console.error(`Cannot register multiple different plugins - Installed: ${this.pluginId}; Registering ${pluginId}!`)
                }
                return;
            }
            this.pluginId = pluginId;
        },
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
        },
        registerStore(store){
            this.stores.push(store)
        },
        getStoreByName(name){
            return this.stores.find(store => {
                return store?.$id === name
            })
        },
        setModal({ component, attrs = {}, onConfirm = null, onCancel = null }) {
            if(component) {
                markRaw(component);
            }
            this.modalComponent = component;
            this.modalAttributes = attrs;
            this.isModalOpen = true;
        },
    },
});