import DevComponentPreview from '../components/DevComponentPreview.vue';
import { useAppStore } from './store';

/**
 * @typedef {Object} PluginMockOptions
 * @property {import('pinia').Pinia} pinia - The Pinia instance used by the playground app.
 * @property {MockRoutes} routes - The mock routes.
 * @property {function} http - The mock implementation of the http function.
 * @property {MockStores} stores - The mock stores to use for the store.
 */

/**
 * @typedef {Object} MockRoutes
 * @property {function} http - The mock implementation of the http function.
 * @param {string} method - The HTTP method (e.g., 'get', 'post', 'put', 'delete').
 * @param {string} url - The URL of the request.
 * @param {Object} data - The data to be sent with the request (for 'post' and 'put' methods).
 * @returns {Object} The mock response data.
 */

/** 
 * @typedef {Object} MockStores
 * @property {Object} store - The mock implementation of the store.
 */

/** 
 * Polyfill for the SpPS plugin system.
 * 
 * @param {PluginMockOptions} options - The options for the polyfill.
 */
export function createPluginMock({ pinia, routes = {}, http = () => { }, stores = {}, extras = {}, api = {} } = {}) {

    console.log("Creating plugin mock with options:", { pinia, routes, http, stores, extras, api });

    let componentRouteAdded = false;
    let componentRoute = {
        path: `/component`,
        name: 'component',
        component: DevComponentPreview,
        children: []
    };

    window.SpPS = {
        api: {
            store: stores,
            http: (method, url, data) => http(method, url, data),
            modal: {
                useModal: ({
                    component = null,
                    attrs = {},
                } = {}) => {
                    useAppStore().setModal({
                        component,
                        attrs,
                        onConfirm: attrs.onConfirm,
                        onCancel: attrs.onCancel,
                    })

                    return {
                        open: () => useAppStore().isModalOpen = true,
                        close: () => useAppStore().isModalOpen = false,
                        destroy: () => { useAppStore().modalComponent = null; useAppStore().isModalOpen = false; },
                    }

                },
            },
            router: {
                push: (route) => {
                    console.log(`Navigating to `, route);
                    const entityId = route?.params?.id ?? 0;

                    if (!entityId) {
                        console.error("No entity ID provided in route params.");
                        return;
                    }

                    const entity = stores?.entityStore?.getEntity(entityId);
                    stores?.entityStore?.set(entity);

                },
                currentRoute: {
                    value: {
                        query: ""
                    }
                }
            },

            ...api,
        },
        data: {
            t: window.i18n?.global?.t,
        },
        register: ({ id, i18n, routes, store }) => {
            window.SpPS.registerI18n(id, i18n);
        },
        registerPreference: ({
            of,
            key,
            label,
            category,
            subcategory,
            custom_subcategory,
            custom_label,
            component,
            componentTag,
            default_value
        } = {}) => {
            const store = useAppStore(pinia);
            store.preferences.push({
                of,
                key,
                label,
                category,
                subcategory,
                custom_subcategory,
                custom_label,
                component,
                componentTag,
                default_value,
            });
        },
        registerI18n: (id, i18n) => {
            const languages = Object.keys(i18n);
            for (const lang of languages) {
                // Build per-locale messages under the `plugin` namespace
                const localeMessages = { plugin: i18n[lang] };


                window.i18n.global.messages[lang] = localeMessages;

            }

            console.log(window.i18n.global.messages.en);
        },
        registerComponent: (componentDefinition) => {
            const store = useAppStore(pinia);
            store.registerComponent(componentDefinition);

            if (!componentRouteAdded) {
                router.addRoute(componentRoute);
                componentRouteAdded = true;
            }

            const path = componentDefinition.componentTag ?? componentDefinition.key;
            router.addRoute('component', {
                path: `${path}`,
                component: componentDefinition.component
            });
        },
        registerRoutes: (id, routes) => {
            const pluginRoute = {
                path: `/${id}`,
                name: id,
                component: null,
                children: [],
                meta: {
                    auth: true
                }
            };
            routes.forEach(route => {
                if (!route.component) {
                    console.error(`Route ${route.path} does not have a component.`);
                    return;
                }

                pluginRoute.children.push({
                    path: route.path,
                    component: route.component,
                    name: `${id}_${route.path.replaceAll('/', '_')}`,
                    children: route.children,
                    params: route.params,
                    props: route.props,
                });
            });
            router.addRoute(pluginRoute);
        },
        /**
         * @typedef {Object} SlotDefinition
         * @property {string} of - Unique id string of the plugin.
         * @property {string} slot - Unique slot string of the plugin. Can be "tab", "tools" or "settings".
         * @property {Object} component - The Vue component to render in the slot. Requires componentTag to be set.
         * @property {string} componentTag - The tag of the component, defaults to key.
         * @property {string} key - Unique key string of the slot.
         * @property {string} icon - Icon of the slot.
         * @property {string} label - Label of the slot.
         * @property {string} href - Unknown at the moment.
         * @property {Object} props - Currently Unsupported
         */

        /**
         * Adds a specific component to a application slot
         * 
         * @param {SlotDefinition} slotDefinition - The definition of the slot to fill. 
         */
        intoSlot: ({
            of, // unique id string of the plugin.
            slot, // ["tab","tools","settings"] - unique slot string of the plugin.
            component, // component of the slot. Requires componentTag to be set.
            componentTag, // tag of the component, defaults to key.
            key, // unique key string of the slot.
            icon, // icon of the slot.
            label, // label of the slot.
            href, // Unknown at the moment.
            props, // Currently Unsupported
        }) => {
            const store = useAppStore(pinia);

            if (slot == 'tab') {
                const tab = {
                    id: key,
                    of: of,
                    icon: icon,
                    label: label,
                    component: component,
                    componentTag: componentTag,
                    href: href ?? '',
                    props: props,
                };
                store.addTab(tab);
            } else if (slot == 'tools' || slot == 'settings') {
                const item = {
                    id: key,
                    of: of,
                    icon: icon,
                    label: label,
                    component: component,
                    componentTag: componentTag,
                    href: href ?? '',
                };
                store[slot].push(item);
            } else {
                console.error(`Unknown slot type: ${slot}`);
            }
        },
        ...extras,
    };
}