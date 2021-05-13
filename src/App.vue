<template>
  <div id="app">
    <h1>Timeline</h1>

    <header>
      <button @click="logout()" v-if="doc">Logout</button>
      <button @click="login()" v-else>Login</button>
      <button @click="saveData()" v-if="doc">Save Data</button>
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
      <input type="number" placeholder="Year" v-model="timestampToAdd.year" />
      <input type="number" placeholder="Month" v-model="timestampToAdd.month" />
      <input type="number" placeholder="Day" v-model="timestampToAdd.day" />
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
      timestampToAdd: {},
    };
  },
  methods: {
    addTimestamp() {
      const { year, month, day, title } = this.timestampToAdd;
      this.timestamps[year] = this.timestamps[year] || [];
      this.timestamps[year].push({ month, day, title });
    },
    removeTimestamp(year, key) {
      this.timestamps[year].shift(key);
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
          this.timestamps = doc.data();
        });
      }
    });
  },
};
</script>

<style lang="scss"></style>
