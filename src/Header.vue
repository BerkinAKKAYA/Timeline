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
    margin-bottom: 50px;

    &::before {
        content: '';
    }

    h1 {
        text-align: center;
    }

    button {
        background: darkred;
        color: white;
        border: none;
        box-shadow: 0 0 0 darkred;

        &:hover {
            box-shadow: 0 0 8px red;
        }
    }
}
</style>
