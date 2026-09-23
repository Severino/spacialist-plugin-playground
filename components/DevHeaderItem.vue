<template>
    <li class="nav-item dropdown">
        <a
            :class="['nav-link', { 'dropdown-toggle': hasItems }]"
            :href="hasItems ? '#' : null"
            :role="hasItems ? 'button' : null"
            :data-bs-toggle="hasItems ? 'dropdown' : null"
            :aria-expanded="hasItems ? 'false' : null"
        >
            {{ title }}<span
                v-if="hasItems"
                class="text-secondary ms-1"
            >({{ items.length }})</span>
        </a>
        <ul
            v-if="hasItems"
            class="dropdown-menu"
        >
            <li
                v-for="item in items"
                :key="item.label"
                class="dropdown-item"
            >
                <RouterLink
                    :to="getTo(item)"
                    href="#"
                >
                    {{ item.label }}
                </RouterLink>
            </li>
        </ul>
    </li>
</template>

<script setup>
    import { computed } from 'vue';
    import { useAppStore } from '../js/store';

    const store = useAppStore()

    const props = defineProps({
        title: {
            type: String,
            required: true
        },
        items: {
            type: Array,
            required: true
        },
    });

    function getTo(item) {
        if (item.to) return item.to
        else return `/${store.pluginId}/${item.href}`
    }

    const hasItems = computed(() => props.items.length > 0);
</script>