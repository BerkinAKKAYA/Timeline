<template>
    <div id="container">
        Most Minimalistic Calendar Ever

        <div id="buttons">
            <button @click="signInAnonymously()">Sign In Anonymously</button>
            <button @click="signInWithGoogle()">Sign In With Google</button>
        </div>
    </div>
</template>

<script>
import { auth, googleProvider } from './firebase';

export default {
    methods: {
        signInAnonymously() {
            auth.signInAnonymously();
        },
        signInWithGoogle() {
            auth.signInWithPopup(googleProvider);
            console.log(googleProvider);
        },
    },
};
</script>

<style lang="scss">
#container {
    margin-top: 100px;
    text-align: center;
}

#buttons {
    margin-top: 50px;

    button {
        margin: 10px;
    }
}
</style>
