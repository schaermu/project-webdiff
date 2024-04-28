<style></style>
<template>
    <div class="mt-10 mx-auto sm:w-full sm:max-w-sm">
        <h1>Login</h1>
        <Form @submit="onSubmit" :validation-schema="schema">
            <TwInput name="username" label="Username" :inline="true" />
            <TwInput name="password" label="Password" type="password" :inline="true" />
            <button :disabled="isSubmitting" type="submit" class="btn btn-primary btn-block">
                <span v-if="isSubmitting" class="loading loading-spinner"></span>
                Login
            </button>
        </Form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Form } from 'vee-validate'
import { useRouter } from 'vue-router'
import * as yup from 'yup'

import { useAuthStore } from '@/stores/auth'
import TwInput from '@/components/forms/TwInput.vue'

const router = useRouter()
const authStore = useAuthStore()

const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
})

const isSubmitting = ref(false)

function resetForm() {
    document.querySelector('form').reset()
}

function onSubmit(values, actions) {
    isSubmitting.value = true
    authStore.login(values.username, values.password).then(() => {
        router.push({ name: 'home' })
        resetForm()
    }).catch(() => {
        actions.setFieldError('username', 'Invalid credentials')
    }).finally(() => {
        isSubmitting.value = false
    })
}

</script>