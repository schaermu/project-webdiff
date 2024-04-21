<template>
    <AppLink v-bind="$attrs"
        class="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
        active-class="font-medium text-blue-500">
        <slot />
    </AppLink>
</template>