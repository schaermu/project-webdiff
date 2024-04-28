<style></style>
<template>
    <div class="mt-10 mx-auto sm:w-full sm:max-w-sm">
        <h1>Login</h1>
        <form @submit="attemptLogin">
            <TwInput name="username" label="Username" :inline="true" />
            <TwInput name="password" label="Password" type="password" :inline="true" />
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
</template>

<script setup>
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

import { useAuthStore } from '@/stores/auth'
import TwInput from '@/components/forms/TwInput.vue'

const router = useRouter()
const authStore = useAuthStore()

const schema = toTypedSchema(
    yup.object({
        username: yup.string().required(),
        password: yup.string().required()
    }),
)

const { handleSubmit } = useForm({
    validationSchema: schema
});

const attemptLogin = handleSubmit(values => {
    try {
        authStore.login(values.username, values.password).then(() => {
            router.push({ name: 'home' })
        })
    } catch (error) {
        console.error('Login failed:', error)
    }
})

</script>