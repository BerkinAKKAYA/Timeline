<template>
    <div id="container" v-if="shown">
        <input type="text" placeholder="Title" v-model="timestampToAdd.title" />

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

        <select v-model="timestampToAdd.day" :disabled="!timestampToAdd.month">
            <option>Uncertain</option>
            <option v-for="day in 30" :key="day">
                {{ day }}
            </option>
        </select>

        <select v-model="timestampToAdd.year">
            <option v-for="offset in 30" :key="offset">
                {{ currentYear + offset - 1 }}
            </option>
        </select>

        <button @click="addTimestamp()" :disabled="!timestampToAdd.title">Add</button>
    </div>
    <div v-else>
        <button id="show" @click="shown = true">Add New</button>
    </div>
</template>

<script>
export default {
    props: ["doc", "addToYear"],
    data() {
        return {
            currentYear: 0,
            timestampToAdd: { month: "Uncertain", day: "Uncertain" },
            shown: false,
        };
    },
    methods: {
        addTimestamp() {
            const { year, month, day, title } = this.timestampToAdd;
            this.addToYear(year, { month, day, title });
            this.shown = false;
        },
    },
    created() {
        const d = new Date();
        this.currentYear = d.getFullYear();
        this.timestampToAdd.year = this.currentYear;
    },
};
</script>

<style lang="scss" scoped>
#container {
    width: 800px;
    max-width: 90vw;
    margin-top: 50px;

    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr 75px;
    gap: 10px;

    select,
    input,
    button {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        outline: none;
        background: none;
        color: black;

        &:not(:disabled):hover {
            border-color: #999;
            cursor: pointer;
        }

        &:disabled {
            opacity: 0.5;

			&:hover {
				cursor: not-allowed;
			}
        }
    }

    input:hover {
        cursor: text !important;
    }
}

#show {
    display: block;
    margin: 50px auto;
    padding: 15px 25px;
    cursor: pointer;
}

.hidden {
    visibility: hidden;
}
</style>
