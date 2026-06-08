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
                <router-link
                    :to="`/${item.of}/${item.href}`"
                    href="#"
                >
                    {{ item.label }}
                </router-link>
            </li>
        </ul>
    </li>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    }
});

const hasItems = computed(() => props.items.length > 0);
</script>