<template>
    <header>
        <h1>Timeline</h1>

        <button @click="logout()" v-if="doc">Logout</button>
    </header>
</template>

<script>
import { auth } from './firebase';

export default {
    props: ['doc'],
    methods: {
        logout() {
            auth.signOut();
        },
    },
};
</script>

<style lang="scss" scoped>
header {
    width: 100%;
    display: grid;
    grid-template-columns: 100px 1fr 100px;
    margin-top: 100px;

    &::before {
        content: '';
    }

    h1 {
        text-align: center;
    }
}
</style>
