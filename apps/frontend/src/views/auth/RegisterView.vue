<style></style>
<template>
    <div class="mt-10 mx-auto sm:w-full sm:max-w-sm">
        <h1>Sign Up</h1>
        <Form @submit="onSubmit" :validation-schema="schema">
            <Input class="my-5" name="username" label="Username" />
            <Input class="my-5" name="email" label="E-Mail Address" />
            <Input class="my-5" name="password" label="Password" type="password" />
            <Input class="my-5" name="passwordRepeat" label="Repeat password" type="password" />
            <VueTurnstile action="login" v-bind:site-key="settingsStore.turnstileSiteKey" v-model="captcha" />
            <button :disabled="isSubmitting" type="submit" class="btn btn-primary btn-block mt-5">
                <span v-if="isSubmitting" class="loading loading-spinner"></span>
                Register
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
    username: yup.string().required('Username is required'),
    email: yup.string().required('E-Mail Address is required').email('Valid E-Mail Address is required'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    passwordRepeat: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match')
})

const isSubmitting = ref(false)
const captcha = ref('')

function resetForm() {
    document.querySelector('form').reset()
}

function onSubmit(values, actions) {
    isSubmitting.value = true
    authStore.register(values.username, values.email, values.password, values.passwordRepeat, captcha.value).then((result) => {
        if (result.ok) {
            resetForm()
            return router.push({ name: 'login' })
        } else {
            actions.setErrors(result.errors)
        }
    }).catch((e) => {
        console.error(e)
    }).finally(() => {
        isSubmitting.value = false
    })
}

</script>