<template>
    <span
        ref="text"
        class="pulsating-text fw-bold"
    >
        <slot />
    </span>
</template>

<script setup>
    import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue';

    const textNode = useTemplateRef('text')

    const props = defineProps({
        startColor: {
            tyoe: String,
            default: "#0d6efd"
        },
        endColor: {
            tyoe: String,
            default: "#5998f7"
        },
        time: {
            tyoe: Number,
            default: 500
        },
    })

    let flipped = false;
    const updateColor = () => {
        textNode.value.style.color = flipped ? props.endColor : props.startColor;
    }

    let intervalId = null

    onMounted(() => {
        const lastTime = Date.now();
        updateColor();
        intervalId = setInterval(() => {
            const timePassed = Date.now() - lastTime;
            if (timePassed > props.time) {
                flipped = !flipped;
                updateColor();
            }
        }, props.time)
    })

    onBeforeUnmount(() => {
        if(intervalId) clearInterval(intervalId);
    })
</script>