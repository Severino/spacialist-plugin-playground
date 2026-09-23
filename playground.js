/**
 * This file is used to initialize the plugin playground in development mode
 * of the Spacialist Plugin System (SpPS). 
 * 
 * It loads a boilerplate of different features to test the funcitonality
 * of the playground and should be extended when new features are added to the playground.
 * 
 */

import { defineStore } from "pinia";
import { usePlayground } from "./setup.js";
import Counter from "./testing/Counter.vue";
import Todo from "./testing/Todo.vue";
import PulsatingText from "./testing/PulsatingText.vue";

await usePlayground({
    http: (method, url, data) => {
        console.log(`HTTP ${method} request to ${url} with data:`, data);
    },
});

const pluginName = "playground";


// Pluginstores should be references directly within the plugin.
export const usePlaygroundStore = defineStore('mock-store', {
    state: () => ({
        points: 16180,
        user: 'Leonardo',
        todos: [
            { message: 'Learn Vue.js', done: false },
            { message: 'Build a todo app', done: false }
        ]
    }),
    getters: {
        highscoreText: (state) => `HIGHSCORE: ${state.user} ${state.points}`
    },
    actions: {
        setHighscore(user, points) {
            this.user = user
            this.points = points
        },
        addItem(message) {
            if (!message) {
                return;
            }
            this.todos.push({ message, done: false });
        }
    }
})

console.log(`Registering plugin "${pluginName}" in SpPS...`);
SpPS.register({
    id: pluginName,
    store: usePlaygroundStore()
})

SpPS.intoSlot({
    of: pluginName,
    slot: "tools",
    component: Counter,
    key: 'counter-tool', // unique key string of the slot.
    icon: 'fas fa-calculator', // icon of the slot.
    label: 'Counter', // label of the slot.
})

SpPS.intoSlot({
    of: pluginName,
    slot: "tools",
    component: Todo,
    key: 'todo-tool', // unique key string of the slot.
    icon: 'fas fa-list', // icon of the slot.
    label: 'Todo', // label of the slot.
})

SpPS.intoSlot({
    of: pluginName, // unique id string of the plugin.
    slot: "tab", // ["tab","tools","settings"] - unique slot string of the plugin.
    component: Counter, // component of the slot. Requires componentTag to be set.
    key: 'counter-tab', // unique key string of the slot.
    icon: 'fas fa-calculator', // icon of the slot.
    label: 'Counter', // label of the slot.
    href: '?', // Unknown at the moment.
    props: '', // Currently Unsupported
})

SpPS.intoSlot({
    of: pluginName, // unique id string of the plugin.
    slot: "tab", // ["tab","tools","settings"] - unique slot string of the plugin.
    component: Todo, // component of the slot. Requires componentTag to be set.
    key: 'todo-tab', // unique key string of the slot.
    icon: 'fas fa-list', // icon of the slot.
    label: 'Todo', // label of the slot.
    href: '?', // Unknown at the moment.
    props: '', // Currently Unsupported
})

SpPS.registerComponent({
    of: pluginName,
    componentTag: "PulsatingText",
    component: PulsatingText
})