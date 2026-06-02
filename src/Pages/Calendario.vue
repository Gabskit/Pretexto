<script setup lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
    components: {
        FullCalendar // make the <FullCalendar> tag available
    },
    data() {
        return {
            calendarOptions: {
                plugins: [dayGridPlugin, interactionPlugin],
                initialView: "dayGridMonth"
            }
        };
    }
};
</script>
<template>
    <div>
        <div class="barui w-full ui-bar-d">
            <img src="./../assets/ptlogoblack.svg" />
        </div>
        <FullCalendar :options="calendarOptions"></FullCalendar>
    </div>
</template>
<style scoped=""></style>
