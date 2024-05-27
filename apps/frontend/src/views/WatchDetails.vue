<template>
    <div class="w-6/12 mx-auto">
        <h1>Edit watch {{ id }}</h1>
        <Form @submit="onSubmit" :validation-schema="schema" :initial-values="watch">
            <TwInput name="url" label="URL" :inline="true" v-model="url" />
            <TwInput name="name" label="Name" :inline="true" v-model="name" />
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                Save
            </button>
        </Form>
        <br />
        <pre>{{ watch }}</pre>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { Form } from 'vee-validate'
import * as yup from 'yup'

import TwInput from '@/components/forms/TwInput.vue'
import WatchesApi from '@/services/watches'

const schema = yup.object({
    url: yup.string().required().url(),
})

const props = defineProps({
    id: {
        type: String,
        required: true,
    }
})

const watch = ref(null)
const isSubmitting = ref(false)
watch.value = await WatchesApi.fetchById(props.id)

function onSubmit(values) {
    isSubmitting.value = true
    WatchesApi.update(props.id, values)
        .then(() => {
            isSubmitting.value = false
        })
        .catch(() => {
            isSubmitting.value = false
        })
}
</script>