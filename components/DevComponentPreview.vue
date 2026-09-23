<template>
    <div class="dev-component-preview p-5 h-100 d-flex flex-column">
        <header class="mb-3">
            <h2>Component Preview</h2>
            <div class="btn-group" @click="isLocal = !isLocal">
                <div class="btn" :class="getClassFor(true)">Local Component</div>
                <div class="btn" :class="getClassFor(false)">Global Consumer Component</div>
            </div>
        </header>
        <div class="position-relative flex-grow-1 d-flex align-items-center justify-content-center bg-light rounded">
            <span class="position-absolute fw-bold top-0 start-0 p-3 text-secondary">Component: {{ componentName }}</span>
            <RouterView v-slot="{Component}">
                <component :is="Component" v-if="isLocal">
                    This is some default slot content.
                </component>

                <component :is="consumerComponentName" v-else>
                    This should display the same component
                </component>
            </RouterView>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const parts = route.fullPath.split("/");
const componentName = parts[parts.length-1]
const consumerComponentName = `SpPlugin${componentName}`
const instance = getCurrentInstance()

const consumerComponent = instance.appContext.components[consumerComponentName]
const isLocal = ref(false);
const getClassFor = (local = false) => {
    return isLocal.value === local ? 'btn-primary' : 'btn-outline-primary'
}
</script>
