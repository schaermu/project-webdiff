<style></style>
<template>
    <div class="mt-10 m-5 sm:mx-auto sm:w-full sm:max-w-lg lg:max-w-4xl">
        <h1>Verifying your e-mail address...</h1>

        <Alert v-if="successful" typeClass="alert-success">
            E-Mail verified successfully, you may now log into your account!
            <template #buttons>
                <router-link to="/login" class="btn btn-primary">Login</router-link>
            </template>
        </Alert>
        <Alert v-if="failed" typeClass="alert-error">
            E-Mail verification failed, try re-sending the verification e-mail.
            <template #buttons>
                <button @click="resendEmail" class="btn btn-primary">Resend E-Mail</button>
            </template>
        </Alert>

        <Alert v-if="emailResent" typeClass="alert-info">
            Verification e-mail re-sent, check your mailbox.
        </Alert>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import Alert from '@/components/ui/Alert.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const userId = route.params.userId
const token = route.query.uuid

if (!userId || !token) {
    router.push({ name: 'login' })
}

const successful = ref(false)
const failed = ref(false)
const emailResent = ref(false)

onMounted(() => {
    authStore.verifyEmail(userId, token)
        .then((res) => {
            resetFlags()
            if (res.ok) {
                successful.value = true
            } else {
                failed.value = true
            }
        })
        .catch(() => {
            failed.value = true
        })
})

const resetFlags = () => {
    successful.value = false
    failed.value = false
    emailResent.value = false
}

const resendEmail = () => {
    authStore.resendVerifyEmail(userId)
        .then(() => {
            resetFlags()
            emailResent.value = true
        })
}

</script>
