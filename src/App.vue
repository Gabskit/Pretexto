<script setup lang="ts">
import { onMounted, ref, defineComponent } from "vue";
import { Icon } from "@iconify/vue"; // Importas Iconify
onMounted(() => {
    setTimeout(() => window.HSStaticMethods.autoInit(), 100);
});
</script>

<template>
    <router-view v-slot="{ Component, route }">
        <transition name="slide" mode="out-in">
            <component :is="Component" :key="route.path" />
        </transition>
    </router-view>
    <div
        class="fixed bottom-0 grid grid-cols-6 w-full ui-bar-b"
        data-theme="valorant"
    >
        <router-link to="/" v-slot="{ navigate, isActive }"
            ><button
                :class="[
                    'btn waves waves-primary',
                    isActive ? 'btn-primary' : 'glass'
                ]"
                @click="navigate"
            >
                <Icon
                    icon="solar:home-smile-angle-line-duotone"
                    class="w-5 h-5"
                />
            </button>
        </router-link>

        <router-link to="/Notas" v-slot="{ navigate, isActive }">
            <button
                :class="[
                    'btn waves waves-primary',
                    isActive ? 'btn-primary' : 'glass'
                ]"
                @click="navigate"
            >
                <Icon icon="solar:document-text-line-duotone" class="w-5 h-5" />
            </button>
        </router-link>
        <router-link to="/Calendario" v-slot="{ navigate, isActive }">
            <button
                :class="[
                    'btn waves waves-primary',
                    isActive ? 'btn-primary' : 'glass'
                ]"
                @click="navigate"
            >
                <Icon
                    icon="solar:calendar-minimalistic-line-duotone"
                    class="w-5 h-5"
                />
            </button>
        </router-link>
        <router-link to="/Edicion" v-slot="{ navigate, isActive }">
            <button
                :class="[
                    'btn waves waves-primary',
                    isActive ? 'btn-primary' : 'glass'
                ]"
                @click="navigate"
            >
                <Icon
                    icon="solar:pen-new-square-line-duotone"
                    class="w-5 h-5"
                />
            </button>
        </router-link>
        <router-link to="/Vista" v-slot="{ navigate, isActive }">
            <button
                :class="[
                    'btn waves waves-primary',
                    isActive ? 'btn-primary' : 'glass'
                ]"
                @click="navigate"
            >
                <Icon icon="solar:eye-line-duotone" class="w-5 h-5" />
            </button>
        </router-link>
    </div>
</template>

<style scoped>
/* Asegura que no aparezca barra de desplazamiento horizontal durante la animación */
body {
    overflow-x: hidden;
    z-index: 0;
}

/* Estado inicial cuando la nueva página entra (viene desde la derecha) */
.slide-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

/* Estado final cuando la antigua página se va (desaparece hacia la izquierda) */
.slide-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}
</style>
