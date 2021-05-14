<template>
    <div id="app">
        <Header :doc="doc" />

        <div v-if="doc">
            <div id="timestamps" v-for="(data, year) in sortedTimestamps" :key="year">
                <h2 class="year">{{ year }}</h2>

                <p class="timestamp" v-for="(timestamp, key) in data" :key="key">
                    <span class="title">{{ timestamp.title }}</span>
                    <span class="remaining">{{ remainingDays(timestamp.day, timestamp.month, year) }} days left</span>
                    <span class="delete" @click="removeTimestamp(year, timestamp)">x</span>
                </p>
            </div>

            <AddTimestamp :doc="doc" :addToYear="addToYear" />
        </div>
        <div v-else style="margin-top: 100px">Most Minimalistic Calendar Ever</div>
    </div>
</template>

<script>
import { auth, usersCollection } from "./firebase";
import Header from "./Header.vue";
import AddTimestamp from "./AddTimestamp.vue";

export default {
    name: "App",
    components: { Header, AddTimestamp },
    data() {
        return {
            doc: null,
            timestamps: {},
        };
    },
    methods: {
        addToYear(year, data) {
            this.timestamps[year] = this.timestamps[year] || [];
            this.timestamps[year].push(data);

            // Save To Firebase
            // this.doc.set(this.timestamps);
        },
        removeTimestamp(year, { title, month, day }) {
            this.timestamps[year] = this.timestamps[year].filter(
                (x) => !(x.title == title && x.month == month && x.day == day)
            );

            if (this.timestamps[year].length == 0) {
                delete this.timestamps[year];
            }

            // Save To Firebase
            // this.doc.set(this.timestamps);
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
    width: 800px;
    max-width: 90vw;

    display: flex;
    flex-direction: column;
    align-items: center;
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
