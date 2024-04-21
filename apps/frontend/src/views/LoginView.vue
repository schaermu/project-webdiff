<template>
    <div>
        <h1>Login</h1>
        <form>
            <label for="username">Username</label>
            <input type="text" v-model="username" name="username" />
            <label for="password">Password</label>
            <input type="password" v-model="password" name="password" />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            username: '',
            password: ''
        }
    }
}
</script>

<style></style>
