<style></style>

<template>
    <div class="form-control my-5">
        <template v-if="inline">
            <label :for="componentId" class="input input-bordered flex items-center gap-2"
                :class="{ 'input-error': hasError }">
                {{ label }}
                <input v-model="value" :name="name" :id="componentId" :type="type" :placeholder="placeholder"
                    class="grow" />
            </label>
        </template>
        <template v-else>
            <label :for="componentId" class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text">{{ label }}</span>
                </div>
                <input v-model="value" :name="name" :id="componentId" :type="type" :placeholder="placeholder"
                    class="input input-bordered w-full max-w-xs" :class="{ 'input-error': hasError }" />
            </label>
        </template>
        <div class="indicator mx-auto">
            <span v-if="hasError" class="indicator-item badge badge-error">{{ errorMessage }}</span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
    name: String,
    label: String,
    placeholder: String,
    type: {
        type: String,
        default: 'text'
    },
    inline: Boolean,
})

const hasError = computed(() => {
    return !!errorMessage.value
})

const { value, errorMessage } = useField(() => props.name);
</script>
