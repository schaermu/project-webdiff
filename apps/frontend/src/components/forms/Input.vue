<style></style>

<template>
    <div class="form-control">
        <template v-if="inline">
            <label :for="componentId" v-bind:class="labelClass" class="input input-bordered flex items-center gap-2"
                :class="{ 'input-error': hasError }">
                {{ label }}
                <input v-model="value" v-bind:class="inputClass" :name="name" :id="componentId" :type="type"
                    :placeholder="placeholder" class="grow" />
            </label>
        </template>
        <template v-else>
            <label :for="componentId" v-bind:class="labelClass" class="form-control w-full">
                <div class="label">
                    <span class="label-text">{{ label }}</span>
                </div>
                <input v-model="value" v-bind:class="inputClass" :name="name" :id="componentId" :type="type"
                    :placeholder="placeholder" class="input input-bordered w-full"
                    :class="{ 'input-error': hasError }" />
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
    labelClass: String,
    inputClass: String,
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
