<template>
    <div id="app">
        <Header :doc="doc" />

        <div v-if="doc">
            <div id="timestamps" v-for="(data, year) in sortedTimestamps" :key="year">
                <h2 class="year">{{ year }}</h2>

                <p
                    class="timestamp"
                    :class="timestamp.month == 'Uncertain' && 'uncertain'"
                    v-for="(timestamp, key) in data"
                    :key="key"
                >
                    <span class="title">{{ timestamp.title }}</span>

                    <span class="remaining">
                        {{
                            timestamp.month == "Uncertain"
                                ? "Uncertain"
                                : timestamp.day == "Uncertain"
                                ? timestamp.month
                                : remainingDays(timestamp.day, timestamp.month, year) + " days left"
                        }}
                    </span>

                    <span class="delete" @click="removeTimestamp(year, timestamp)">x</span>
                </p>
            </div>

            <p v-if="Object.keys(sortedTimestamps).length == 0" class="no-timestamps">No Timestamps Yet</p>

            <AddTimestamp :doc="doc" :addToYear="addToYear" />
        </div>

        <Welcome v-else />
    </div>
</template>

<script>
import { auth, usersCollection } from "./firebase";
import Header from "./Header.vue";
import Welcome from "./Welcome.vue";
import AddTimestamp from "./AddTimestamp.vue";

export default {
    name: "App",
    components: { Header, AddTimestamp, Welcome },
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

            this.save();
        },
        removeTimestamp(year, { title, month, day }) {
            if (!confirm("Are you sure?")) {
                return;
            }

            this.timestamps[year] = this.timestamps[year].filter(
                (x) => !(x.title == title && x.month == month && x.day == day)
            );

            if (this.timestamps[year].length == 0) {
                delete this.timestamps[year];
            }

            this.save();
        },
        save() {
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
                    console.log(doc.data());
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

button {
    padding: 10px 15px;
    cursor: pointer;
    border: 1px solid #bbb;
    border-radius: 5px;
    outline: none;

    &:hover {
        border-color: #999;
    }
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

        &.uncertain {
            opacity: 0.4;
        }

        .title {
            font-weight: bold;
            text-align: right;
            border: none;
            outline: none;
            font-size: 1em;
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

.no-timestamps {
    text-align: center;
    margin-top: 50px;
}
</style>
