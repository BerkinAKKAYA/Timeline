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
import { auth } from "./firebase";

export default {
    methods: {
        signInAnonymously() {
            auth.signInAnonymously();
        },
        signInWithGoogle() {
            alert("Todo");
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
		padding: 10px 15px;
		margin: 10px;
		cursor: pointer;
	}
}
</style>
