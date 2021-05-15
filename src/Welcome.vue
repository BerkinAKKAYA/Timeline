<template>
    <div id="container">
        Most Minimalistic Calendar Ever

        <p style="opacity: 0.4; margin-top: 8px">by Berkin AKKAYA</p>

        <h2 id="title">Sign In</h2>

        <div id="buttons">
            <button @click="signInAnonymously()" class="anonymous">
                <span>Anonymously</span>
            </button>

            <button @click="signInWithGoogle()" class="google">
                <span class="icon"></span>
                <span>With Google</span>
            </button>
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
    margin-top: 20px;
    text-align: center;
}

#title {
    margin-top: 60px;
    margin-bottom: 15px;
}

#buttons {
    display: flex;

    button {
        margin: 10px;
        height: 60px;

        display: inline-flex;
        align-items: center;

        background: white;
        color: #444;
        width: 190px;
        border-radius: 5px;
        border: thin solid #888;
        box-shadow: 1px 1px 1px grey;
        white-space: nowrap;

        box-shadow: 0 0 0 #666;

        &.google {
            justify-content: space-around;
        }
        &.anonymous {
            justify-content: center;
        }

        span {
            font-size: 1.3em;
            font-weight: bold;
        }

        span.icon {
            display: inline-block;
            background: url('/img/google_logo.png');
            background-size: contain;
            background-repeat: no-repeat;
            width: 28px;
            height: 28px;
        }

        &:hover {
            cursor: pointer;
            box-shadow: 0 0 6px #999;
        }
    }
}
</style>
