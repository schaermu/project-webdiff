<template>
    <div class="flex flex-col">
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
        <div class="w-10/12 mx-auto mt-10">
            <div class="overflow-x-auto">
                <table class="table table-zebra">
                    <thead>
                        <tr>
                            <th>Name/URL</th>
                            <th>Last check</th>
                            <th>Last change</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="watch in watches" :key="watch.id">
                            <td>{{ watch.url }}</td>
                            <td>{{ watch.last_check }}</td>
                            <td>{{ watch.last_change }}</td>
                            <td>{{ watch.status }}</td>
                            <td>
                                <router-link :to="`/watches/${watch.id}`"
                                    class="btn btn-sm btn-primary">Details</router-link>
                                <button class="btn btn-sm btn-error"
                                    @click.prevent="promptDelete(watch.id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'

import TwInput from '@/components/forms/TwInput.vue'
import WatchesApi from '@/services/watches'

const schema = yup.object({
    url: yup.string().required().url(),
})

const watches = ref([])
const isSubmitting = ref(false)
const router = useRouter()

const watchResult = await WatchesApi.fetchAll()
if (watchResult.count > 0) {
    watches.value = watchResult.results
}

function onSubmit(values, actions) {
    isSubmitting.value = true
    WatchesApi.create(values)
        .then((data) => {
            actions.resetForm()
            isSubmitting.value = false
            router.push(`/watches/${data.id}`)
        })
        .catch(() => {
            isSubmitting.value = false
        })
}

function promptDelete(id) {
    if (confirm('Are you sure you want to delete this watch?')) {
        WatchesApi.delete(id)
            .then(() => {
                watches.value = watches.value.filter((watch) => watch.id !== id)
            })
    }
}

</script>