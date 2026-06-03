<script setup lang="ts">
import { Icon } from "@iconify/vue"; // Importas
</script>
<script lang="ts">
import { defineComponent } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default defineComponent({
    components: {
        FullCalendar
    },
    data() {
        return {
            calendarOptions: {
                plugins: [dayGridPlugin, interactionPlugin],
                initialView: "dayGridMonth",
                locale: "es",
                headerToolbar: {
                    left: "title",
                    center: "",
                    right: "prev,next"
                },
                events: [],
                height: "auto"
            }
        };
    }
});
</script>
<template>
    <div>
        <div class="barui w-full ui-bar-d">
            <img src="./../assets/ptlogoblack.svg" />
            <button
                class="btn btn-primary waves waves-primary squircle"
                data-theme="claude"
            >
                <Icon
                    icon="solar:calendar-add-line-duotone"
                    class="w-5 h-5"
                />Añadir evento
            </button>
        </div>
        <FullCalendar :options="calendarOptions"></FullCalendar>
    </div>
</template>
<style>
.fc .fc-toolbar-title {
    font-family: "lexend-deca", sans-serif !important;
    font-size: 1.1rem !important;
    font-weight: 700 !important;
    color: var(--fallback-bc, inherit);
    text-transform: capitalize;
}
.fc .fc-button-primary {
    background-color: rgba(255, 255, 255, 0.05) !important;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    color: var(--fallback-bc, inherit) !important;
    transition: all 0.2s ease;
    border-radius: 0.5rem !important;
}

.fc .fc-button-primary:hover,
.fc .fc-button-primary:active {
    background-color: rgba(255, 255, 255, 0.2) !important;
    border-color: rgba(255, 255, 255, 0.2) !important;
}
.fc td,
.fc th {
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    font-family: "lexend-deca", sans-serif !important;
}
.fc .fc-daygrid-day-number,
.fc .fc-col-header-cell-cushion {
    color: var(--fallback-bc, inherit) !important;
    text-decoration: none !important;
    font-size: 0.8rem;
    padding: 6px !important;
}
.fc .fc-day-today {
    background-color: rgba(255, 255, 255, 0.05) !important;
}
</style>
