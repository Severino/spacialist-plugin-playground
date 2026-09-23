<template>
    <nav class="navbar navbar-expand-lg border-bottom d-flex">
        <div class="container-fluid">
            <img
                src="../spacialist_logo.svg"
                alt="Spacialist Logo"
                width="30"
                height="30"
                class="playground-logo d-inline-block align-text-top me-4"
            >
            <RouterLink
                class="navbar-brand"
                to="/"
            >

                <span class="fw-bold">{{ store.pluginId?.toUpperCase() || "UNREGISTERED" }}</span> <span
                    style="font-size: 1rem; font-weight: 100;"
                >playground</span>
            </RouterLink>
            <div class="collapse navbar-collapse justify-content-end">
                <div>
                    <ul class="navbar-nav d-flex gap-3 align-items-center">
                        <li>
                            <button
                                class="btn btn-secondary btn-sm"
                                @click="testModal"
                            >
                                Modal
                            </button>
                        </li>
                        <li>
                            <RouterLink
                                class="nav-link d-flex flex-align-center"
                                to="/"
                            >
                                Tabs<span
                                    v-if="tabCount > 0"
                                    class="badge rounded-pill text-bg-primary ms-1"
                                    style="font-size: 0.5rem; align-self: flex-start;"
                                >{{ tabCount }}</span>
                            </RouterLink>
                        </li>
                        <DevHeaderItem
                            v-for="item in items"
                            :key="item.title"
                            :title="item.title"
                            :items="item.items"
                            :to="item.to"
                        />
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
    import { computed } from 'vue';
    import { useAppStore } from '../js/store';
    import DevHeaderItem from './DevHeaderItem.vue';


    const store = useAppStore();
    const items = computed(() => [
        {
            title: 'Stores',
            items: store.stores.map((store) => {
                const name = store.$id
                return {
                    label: name,
                    to: { name: 'Store', params: { name: name } }
                }
            }),
        },
        {
            title: 'Tools',
            items: store.tools.map(tool => {
                return {
                    label: tool.label,
                    to: { name: `Tools`, params: { id: tool.id } }
                }
            })
        },
        {
            title: 'Settings',
            items: store.settings
        },
        {
            title: 'Components',
            items: store.components.map(component => {
                const label = component.componentTag;
                return {
                    label,
                    to: { name: `Component-${label}` }
                }
            })
        }
    ]);

    const testModal = () => {
        store.isModalOpen = true;
    };

    const tabCount = computed(() => {
        return store.tabs.length
    })
</script>

<style
    lang='scss'
    scoped
>

    .navbar {
        padding-top: 3px;
        padding-bottom: 3px;
    }

</style>