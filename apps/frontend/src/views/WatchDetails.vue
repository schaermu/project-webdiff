<template>
    <div>
        <h1>Edit watch {{ id }}</h1>
        <pre>
            {{ watch }}
        </pre>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import WatchesApi from '@/services/watches'

const props = defineProps({
    id: {
        type: String,
        required: true,
    }
})

const watch = ref(null)
watch.value = await WatchesApi.fetchById(props.id)
</script>