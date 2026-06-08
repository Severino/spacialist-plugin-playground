<template>
    <div class="tab">
        <h1>Counter</h1>
        <p>
            Clicked the button:
            {{ counter }}
        </p>
        <button
            class="btn btn-primary"
            @click="() => counter++"
        >
            Click me
        </button>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const counter = ref(0);
</script>