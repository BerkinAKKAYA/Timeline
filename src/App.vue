<template>
    <div id="app">
        <Header :doc="doc" />

        <div v-if="doc">
            <div id="timestamps" v-for="(data, year) in timestamps" :key="year">
                <div class="year">
                    <div></div>
                    <div class="circle"></div>
                    <h1>{{ year }}</h1>
                </div>

                <div
                    class="timestamp"
                    :class="timestamp.month == 'Uncertain' && 'uncertain'"
                    v-for="(timestamp, key) in data"
                    :key="key"
                >
                    <span class="remaining">
                        {{
                            timestamp.month == 'Uncertain'
                                ? 'Uncertain'
                                : timestamp.day == 'Uncertain'
                                ? timestamp.month
                                : remainingDays(timestamp.day, timestamp.month, year) + ' days left'
                        }}
                    </span>

                    <div class="circle" @click="removeTimestamp(year, timestamp)"></div>

                    <span class="title" @input="(e) => changeName(e, year, key)" contenteditable>
                        {{ timestamp.title }}
                    </span>
                </div>
            </div>

            <p v-if="Object.keys(timestamps).length == 0" class="no-timestamps">No Timestamps Yet</p>

            <AddTimestamp :doc="doc" :addToYear="addToYear" />
        </div>

        <Welcome v-else />
    </div>
</template>

<script>
import { auth, usersCollection } from './firebase';
import Header from './Header.vue';
import Welcome from './Welcome.vue';
import AddTimestamp from './AddTimestamp.vue';

console.clear();

export default {
    name: 'App',
    components: { Header, AddTimestamp, Welcome },
    data() {
        return {
            doc: null,
            timestamps: {},
        };
    },
    methods: {
        changeName(e, year, key) {
            this.timestamps[year][key].title = e.target.innerText;
            this.save();
        },
        addToYear(year, data) {
            this.timestamps[year] = this.timestamps[year] || [];
            this.timestamps[year].push(data);

            this.sortByDate();
            this.save();
        },
        removeTimestamp(year, timestamp) {
            if (!confirm('Do you want to delete this timestamp?')) {
                return;
            }

            const { title, month, day } = timestamp;

            this.timestamps[year] = this.timestamps[year].filter(
                (x) => !(x.title == title && x.month == month && x.day == day)
            );

            if (this.timestamps[year].length == 0) {
                delete this.timestamps[year];
            }

            this.save();
        },
        save() {
            // this.doc.set(this.timestamps);
        },
        remainingSeconds(day, month, year) {
            const d = day == 'Uncertain' ? 31 : day;
            const m = month == 'Uncertain' ? 'December' : month;
            const dateStr = `${m} ${d}, ${year}`;
            const diff = new Date(dateStr) - Date.now();
            return diff;
        },
        remainingDays(day, month, year) {
            const result = this.remainingSeconds(day, month, year) / (1000 * 60 * 60 * 24);
            return Math.ceil(result);
        },
        sortByDate() {
            for (const year of Object.keys(this.timestamps)) {
                const diff = (x) => this.remainingSeconds(x.day, x.month, year);
                this.timestamps[year].sort((x, y) => diff(x) - diff(y));
            }
        },
    },
    created() {
        auth.onAuthStateChanged((user) => {
            this.doc = user && usersCollection.doc(user.uid);

            if (this.doc) {
                this.doc.get().then((doc) => {
                    this.timestamps = doc.data() || {};
                    this.sortByDate();
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

.circle {
    width: 15px;
    height: 15px;
    border-radius: 100%;
    background: #333;
    text-align: center;
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
    display: flex;
    flex-direction: column;
    align-items: center;

    .year {
        display: grid;
        grid-template-columns: 1fr 30px 1fr;
        align-items: center;
        gap: 20px;
        margin-top: 30px;
        margin-bottom: 15px;

        .circle {
            height: 30px;
        }

        div {
            width: 100%;
        }
    }

    .timestamp {
        width: 100%;
        margin: 10px 0;
        font-size: 1.5em;

        display: grid;
        grid-template-columns: 1fr 15px 1fr;
        align-items: center;
        gap: 25px;

        &.uncertain .title {
            opacity: 0.4;
        }

        .title {
            font-weight: bold;
            border: none;
            outline: none;
            font-size: 1em;
        }
        .remaining {
            text-align: right;
            opacity: 0.5;
        }
        .circle {
            opacity: 0.8;
            cursor: pointer;

            &:hover {
                opacity: 1;
                background: darkred;
            }
        }
    }
}

.no-timestamps {
    text-align: center;
    margin-top: 50px;
}
</style>
