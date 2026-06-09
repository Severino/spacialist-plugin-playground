<template>
    <div
        class="dev-modal"
        v-if="store.isModalOpen"
    >

        <div class="dev-modal-content position-relative d-flex flex-column">
            <button
                class="btn-close position-absolute top-0 end-0 m-3"
                @click="store.isModalOpen = false"
            ></button>
            <div class="flex-fill">
                <component
                    v-if="store.modalComponent"
                    :is="store.modalComponent"
                    v-bind="store.modalAttributes"
                />
                <p
                    v-else
                    class="text-center text-danger"
                >
                    Component not set
                </p>
            </div>
            <footer class="d-flex justify-content-end gap-2 mt-3"
                v-if="store.modalAttributes.onConfirm || store.modalAttributes.onCancel"
            >
                <button
                    class="btn btn-secondary"
                    @click="store.isModalOpen = false"
                >
                    Close
                </button>
                <button
                    v-if="store.modalComponent && store.modalAttributes.onConfirm"
                    class="btn btn-primary"
                    @click="store.modalAttributes.onConfirm()"
                >
                    Confirm
                </button>

            </footer>
        </div>
    </div>
</template>

<script setup>
    import { useAppStore } from '../js/store';

    const store = useAppStore();
</script>

<style
    lang='scss'
    scoped
>

    .dev-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1050;
        /* Bootstrap modal z-index */
    }

    .dev-modal-content {
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        max-width: 1080px;
        width: 100%;
        min-height: 200px;
    }


</style>