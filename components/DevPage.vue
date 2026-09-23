<template>
    <div class="dev-page flex-fill overflow-y-auto p-5">
        <component
            v-if="!error"
            :is="component"
        />
        <p class="text-danger">{{ error }}</p>
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router';
    import { useAppStore } from '../js/store';
    import { nextTick, onMounted, ref, shallowRef, watch } from 'vue';
    const store = useAppStore()
    const route = useRoute()

    const error = ref("")
    const component = shallowRef(null)

    function update() {
        const type = route.name.toLowerCase();
        const id = route.params.id;
        if (!type) {
            error.value += "No Type"
        }

        if (!id) {
            error.value += "No Id"
        }

        if (error.value) {
            return;
        }

        const appStore = useAppStore()
        const el = appStore[type].find((el) => el.id === id)
        if (!el) {
            error.value = `Tool with id "${el.id}" was not found!`
        } else if (!el.component) {
            error.value = `No component found for tool "${el.id}"!`
        } else {
            component.value = el.component
        }
    }

    watch(() => route.params, () => {
        update()
    })

    onMounted(() => {
        nextTick(() => {
            update();
        })
    })

</script>