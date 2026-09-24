<template>
    <div class="dev-component-preview p-5 h-100 d-flex flex-column">
        <header class="d-flex mb-3 justify-content-between align-items-end">
            <h2>Component Preview: <i>{{ componentName }}</i></h2>
            <div
                class="btn-group"
                @click="isLocal = !isLocal"
            >
                <div
                    class="btn"
                    :class="getClassFor(true)"
                >Local</div>
                <div
                    class="btn"
                    :class="getClassFor(false)"
                >Global Consumer</div>
            </div>
        </header>
        <div class="position-relative flex-grow-1 d-flex flex-column justify-content-center bg-light rounded border border-1 overflow-hidden">
            <span class="position-absolute fw-bold top-0 start-0 p-3 text-secondary">Component: {{ componentName
            }}</span>
            <div class="flex-fill d-flex align-items-center p-5">
                <RouterView v-slot="{ Component }">
                    <component
                        :is="Component"
                        v-if="isLocal"
                    >
                        This is some default slot content.
                    </component>

                    <component
                        :is="consumerComponentName"
                        v-else
                    >
                        &lt;{{ consumerComponentName }}&gt;
                        This is some default slot content for the global consumer component.
                        &lt;/{{ consumerComponentName }}&gt;
                    </component>
                </RouterView>
            </div>

            <pre class="bg-dark text-light p-3 m-0">
&lt;{{ consumerComponentName }}&gt;
        This is some default slot content for the global consumer component.
&lt;/{{ consumerComponentName }}&gt;
            </pre>
        </div>
    </div>
</template>

<script setup>
    import { getCurrentInstance, ref } from 'vue';
    import { useRoute } from 'vue-router';


    const route = useRoute()
    const parts = route.fullPath.split("/");
    const componentName = parts[parts.length - 1]
    const consumerComponentName = `SpPlugin${componentName}`
    const instance = getCurrentInstance()

    const consumerComponent = instance.appContext.components[consumerComponentName]
    const isLocal = ref(false);
    const getClassFor = (local = false) => {
        return isLocal.value === local ? 'btn-primary' : 'btn-outline-primary'
    }
</script>
