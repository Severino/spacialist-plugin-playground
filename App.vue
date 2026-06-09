<script setup>
    import DevHeader from './components/DevHeader.vue';
</script>

<template>
    <div
        class="d-flex flex-column h-100"
    >
        <DevHeader />
        <div class="flex-fill">
            <RouterView />
        </div>
    </div>
</template>