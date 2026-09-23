<template>
    <div class="dev-store p-5">
        <h2 style="margin-bottom: 2rem;;">Store <i>"{{ name }}"</i></h2>

        <h3>State</h3>
        <pre>{{ state }}</pre>
        <h3>Getters</h3>
        <pre>{{ getters }}</pre>
    </div>
</template>

<script setup>
    import { computed, onMounted } from 'vue';
    import { useAppStore } from '../js/store';
    const router = useAppStore().router

    const props = defineProps({
        name: String
    })

    const store = computed(() => useAppStore().getStoreByName(props.name))

    const state = computed(() => {
        const _store = store.value
        if (_store) {
            try{
            return JSON.stringify(_store().$state, null, 4)
            } catch (e) {
                return e?.message ? e.message : e;
            }
        } else return null
    })

    const getters = computed(() => {
        const _store = store.value
        if (_store) {
            const getters = {}
            _store()._getters.forEach(key => {
                getters[key] = _store()[key]
            });

            return getters
        } else return null
    })

</script>