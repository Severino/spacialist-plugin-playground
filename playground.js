/**
 * This file is used to initialize the plugin playground in development mode
 * of the Spacialist Plugin System (SpPS). 
 * 
 * It loads a boilerplate of different features to test the funcitonality
 * of the playground and should be extended when new features are added to the playground.
 * 
 */

import { usePlayground } from "./setup.js";
import Counter from "./testing/Counter.vue";
import Todo from "./testing/Todo.vue";

await usePlayground({
    http: (method, url, data) => {
        console.log(`HTTP ${method} request to ${url} with data:`, data);
    },
    routes: [],
    stores: {

    }
});

const pluginName = "playground";

console.log(`Registering plugin "${pluginName}" in SpPS...`);
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