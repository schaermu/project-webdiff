<template>
    <div class="w-6/12 mx-auto mt-10">
        <h1>Create new watch</h1>
        <Form @submit="onSubmit" :validation-schema="schema">
            <div class="flex gap-2">
                <TwInput class="flex-auto" name="url" label="URL" :inline="true" inputClass="input-lg"
                    labelClass="input-lg" />
                <button type="submit" class="btn btn-lg btn-primary">
                    <span v-if="isSubmitting" class="loading loading-spinner"></span>
                    Next
                </button>
            </div>
        </Form>
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

const isSubmitting = ref(false)

function onSubmit(values, actions) {
    isSubmitting.value = true
    WatchesApi.create(values)
        .then(() => {
            actions.resetForm()
            isSubmitting.value = false
        })
        .catch(() => {
            isSubmitting.value = false
        })
}

</script>