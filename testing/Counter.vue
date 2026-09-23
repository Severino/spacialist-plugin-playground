<template>
    <div class="tab" style="height: 3000px">
        <h1>Counter</h1>
        <p>
            <PulsatingText>{{ playgroundStore.user }}</PulsatingText> has clicked the button
            <PulsatingText>{{ playgroundStore.points }}</PulsatingText> times
        </p>
        <button
            class="btn btn-primary"
            @click="() => playgroundStore.points++"
        >
            Click me
        </button>
    </div>
</template>

<script setup>
    import {usePlaygroundStore} from "../playground"
import PulsatingText from "./PulsatingText.vue";
    const playgroundStore = usePlaygroundStore();
</script>