<script setup>
    import DevHeader from './components/DevHeader.vue';
    import DevModal from './components/DevModal.vue';

    
</script>

<template>
    <div class="d-flex flex-column h-100">
        <DevHeader />
        <div class="flex-fill">
            <RouterView />
        </div>
        <DevModal />
    </div>
</template>