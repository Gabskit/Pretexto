<script setup lang="ts">
  import { Icon } from "@iconify/vue"; // Importas 
</script>
<template>
    <div>
        <div class="barui w-full ui-bar-d">
            <img src="./../assets/ptlogoblack.svg" />
            <button
                class="btn btn-primary waves waves-primary squircle"
                data-theme="claude"
            ><Icon icon="solar:document-medicine-line-duotone" class="w-5 h-5"/>
                Nueva Nota
            </button>
        </div>
    </div>
</template>
<style scoped></style>
