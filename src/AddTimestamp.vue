<template>
    <div>
        <select v-model="timestampToAdd.year">
            <option v-for="offset in 30" :key="offset">
                {{ currentYear + offset - 1 }}
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
</template>

<script>
export default {
    props: ["doc", "addToYear"],
    data() {
        return {
            currentYear: 0,
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

			this.addToYear(year, { month, day, title })
        },
    },
    created() {
        const d = new Date();
        this.currentYear = d.getFullYear();
        this.timestampToAdd.year = this.currentYear;
    },
};
</script>
