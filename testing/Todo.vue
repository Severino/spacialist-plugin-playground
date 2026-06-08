<template>
    <div class="container py-4">
        <div class="card shadow-sm">
            <div class="card-body">
                <h1 class="h3 mb-2">Todo</h1>
                <p class="text-muted mb-3">
                    This is a todo list. You can add items to the list and mark them as done.
                </p>

                <div class="list-group mb-3">
                    <label
                        v-for="(item, index) in items"
                        class="list-group-item align-items-center d-flex gap-2"
                        :class="{'bg-light-subtle': item.done}"
                    >
                        <input
                            class="form-check-input mt-0"
                            type="checkbox"
                            v-model="item.done"
                        >
                        <span :class="{ 'text-decoration-line-through text-muted': item.done }">{{ item.text
                        }}</span>
                    </label>
                </div>

                <div class="input-group">
                    <input
                        v-model="newItem"
                        @keyup.enter="addItem"
                        class="form-control"
                        placeholder="Add new item"
                    >
                    <button
                        class="btn btn-primary"
                        type="button"
                        @click="addItem"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    const items = ref([
        { text: 'Learn Vue.js', done: false },
        { text: 'Build a todo app', done: false }
    ]);
    const newItem = ref('');

    function addItem() {
        const text = newItem.value.trim();
        if (!text) {
            return;
        }

        items.value.push({ text, done: false });
        newItem.value = '';
    }
</script>