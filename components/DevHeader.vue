<template>
    <nav class="navbar navbar-expand-lg border-bottom d-flex">
        <div class="container-fluid">
            <img
                src="../spacialist_logo.svg"
                alt="Spacialist Logo"
                width="30"
                height="30"
                class="playground-logo d-inline-block align-text-top me-2"
            >
            <RouterLink
                class="navbar-brand"
                to="/"
            >
                Plugin Development
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
                                class="nav-link"
                                to="/"
                            >
                                Tabs
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
    import { useAppStore } from '../js/store';
    import DevHeaderItem from './DevHeaderItem.vue';


    const store = useAppStore();

    const items = [
        {
            title: 'Tools',
            items: store.tools
        },
        {
            title: 'Settings',
            items: store.settings
        },
        {
            title: 'Components',
            items: store.components
        }
    ];

    const testModal = () => {
        
        store.isModalOpen=true;
    };

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