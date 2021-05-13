<template>
    <div id="app">
        <header>
            <h1>Timeline</h1>

            <button @click="logout()" v-if="doc">Logout</button>
            <button @click="login()" v-else>Login</button>
        </header>

        <div id="timestamps" v-for="(data, year) in sortedTimestamps" :key="year">
            <h2 class="year">{{ year }}</h2>

            <p class="timestamp" v-for="(timestamp, key) in data" :key="key">
                <span class="title">{{ timestamp.title }}</span>
                <span class="remaining">{{ remainingDays(timestamp.day, timestamp.month, year) }} days left</span>
                <span class="delete" @click="removeTimestamp(year, key)">x</span>
            </p>
        </div>

        <div style="margin-top: 25px">
            <select v-model="timestampToAdd.year">
                <option v-for="offset in 30" :key="offset">
                    {{ year + offset - 1 }}
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

            <select v-model="timestampToAdd.day" v-if="timestampToAdd.month != 'Uncertain'">
                <option>Uncertain</option>
                <option v-for="day in 30" :key="day">
                    {{ day }}
                </option>
            </select>

            <input type="text" placeholder="Title" v-model="timestampToAdd.title" />

            <button @click="addTimestamp()">Add</button>
        </div>
    </div>
</template>

<script>
import { auth, usersCollection } from "./firebase";

console.clear();

export default {
    name: "App",
    data() {
        return {
            doc: null,
            timestamps: {},
            timestampToAdd: {
                month: "Uncertain",
                day: "Uncertain",
            },
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

            if (!this.timestamps[year].length) {
                delete this.timestamps[year];
            }

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
        remainingSeconds(day, month, year) {
            const d = day == "Uncertain" ? 1 : day;
            const m = month == "Uncertain" ? "January" : month;
            const dateStr = `${m} ${d}, ${year}`;
            const diff = new Date(dateStr) - Date.now();
            return diff;
        },
        remainingDays(day, month, year) {
            const result = this.remainingSeconds(day, month, year) / (1000 * 60 * 60 * 24);
            return Math.ceil(result);
        },
    },
    computed: {
        year() {
            const d = new Date();
            return d.getFullYear();
        },
        sortedTimestamps() {
            const result = JSON.parse(JSON.stringify(this.timestamps));

            for (const year of Object.keys(result)) {
                const diff = (x) => this.remainingSeconds(x.day, x.month, year);
                result[year].sort((x, y) => diff(x) - diff(y));
            }

            return result;
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

        this.timestampToAdd.year = this.year;
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
    margin-top: 100px;

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

#timestamps {
    width: 100%;

    .year {
        text-align: center;
        margin-top: 50px;
        margin-bottom: 20px;
    }

    .timestamp {
        margin: 10px 0;
        font-size: 1.5em;

        display: grid;
        grid-template-columns: 1fr 250px 1fr;

        .title {
            font-weight: bold;
            text-align: right;
        }
        .remaining {
            text-align: center;
        }
        .delete {
            color: red;
            opacity: 0.6;
            cursor: pointer;
            text-align: left;

            &:hover {
                opacity: 1;
            }
        }
    }
}
</style>
