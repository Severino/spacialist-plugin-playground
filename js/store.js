import { defineStore } from 'pinia';

let _pinia = null;

export const setPinia = (pinia) => {
    if(_pinia != null) {
        console.error('Pinia instance already set. Overwriting existing instance.');
    } else {
        console.log('Setting Pinia instance in store.js', pinia);
    }
    _pinia = pinia;
}

export const usePinia = () => {
    if (!_pinia) {
        throw new Error('Pinia instance not set. Please call setPinia(pinia) before using the store.');
    }
    return _pinia;
}

export const useAppStore = () => {
    return _useAppStore(usePinia());
}

const _useAppStore = defineStore('appStore', {
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