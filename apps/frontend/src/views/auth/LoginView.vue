<style></style>
<template>
    <div class="mt-10 mx-auto sm:w-full sm:max-w-sm">
        <h1>Login</h1>
        <Form @submit="onSubmit" :validation-schema="schema">
            <Input class="my-5" name="username" label="Username" :inline="true" />
            <Input class="my-5" name="password" label="Password" type="password" :inline="true" />
            <VueTurnstile action="login" v-bind:site-key="settingsStore.turnstileSiteKey" v-model="captcha" />
            <button :disabled="isSubmitting || !captcha" type="submit" class="btn btn-primary btn-block mt-5">
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
import VueTurnstile from 'vue-turnstile'

import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import Input from '@/components/forms/Input.vue'

const router = useRouter()
const authStore = useAuthStore()
const settingsStore = useSettingsStore()

const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
})

const isSubmitting = ref(false)
const captcha = ref('')

function resetForm() {
    document.querySelector('form').reset()
}

function onSubmit(values, actions) {
    isSubmitting.value = true
    authStore.login(values.username, values.password, captcha.value).then(() => {
        router.push({ name: 'home' })
        resetForm()
    }).catch(() => {
        actions.setFieldError('username', 'Invalid credentials or not verified')
    }).finally(() => {
        isSubmitting.value = false
    })
}

</script>