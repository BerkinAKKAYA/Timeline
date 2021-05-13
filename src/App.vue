<template>
    <div id="app">
        <header>
            <h1>Timeline</h1>

            <button @click="logout()" v-if="doc">Logout</button>
            <button @click="login()" v-else>Login</button>
        </header>

        <div v-for="(data, year) in timestamps" :key="year">
            <h4>{{ year }}</h4>

            <p v-for="(timestamp, key) in data" :key="key">
                <button @click="removeTimestamp(year, key)">Delete</button>

                {{ timestamp.day }}/{{ timestamp.month }} |
                {{ timestamp.title }}
            </p>
        </div>

        <div style="margin-top: 25px">
            <select v-model="timestampToAdd.year">
                <option v-for="day in 30" :key="day">
                    {{ 2020 + day }}
                </option>
            </select>

            <select v-model="timestampToAdd.month">
                <option>Uncertain</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
            </select>

            <select v-model="timestampToAdd.day">
                <option>Uncertain</option>
                <option v-for="day in 30" :key="day">
                    {{ day }}
                </option>
            </select>

            <input
                type="text"
                placeholder="Title"
                v-model="timestampToAdd.title"
            />
            <button @click="addTimestamp()">Add</button>
        </div>
    </div>
</template>

<script>
import { auth, usersCollection } from "./firebase";

export default {
    name: "App",
    data() {
        return {
            doc: null,
            timestamps: {},
            timestampToAdd: { month: "Uncertain", day: "Uncertain" },
        };
    },
    methods: {
        addTimestamp() {
            const { year, month, day, title } = this.timestampToAdd;

            if (!year || !title) {
                return;
            }

            this.timestamps[year] = this.timestamps[year] || [];
            this.timestamps[year].push({ month, day, title });
            this.saveData();
        },
        removeTimestamp(year, key) {
            this.timestamps[year].shift(key);
            this.saveData();
        },
        login() {
            auth.signInAnonymously();
        },
        logout() {
            auth.signOut();
        },
        saveData() {
            this.doc.set(this.timestamps);
        },
    },
    created() {
        auth.onAuthStateChanged((user) => {
            this.uid = user && user.uid;
            this.doc = user && usersCollection.doc(user.uid);

            if (this.doc) {
                this.doc.get().then((doc) => {
                    this.timestamps = doc.data() || {};
                });
            }
        });
    },
};
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    display: flex;
    justify-content: center;
}

#app {
    width: 600px;
    max-width: 90vw;

    display: flex;
    flex-direction: column;
    align-items: center;
}

header {
    margin: 50px 0;

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
