<script setup lang="ts">
import { onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { IStaticMethods } from "flyonui";
onMounted(() => {
    if (typeof window !== "undefined" && (window as any).HSStaticMethods) {
        (window as any).HSStaticMethods.autoInit();
    }
});
</script>
<template>
    <div class="h-screen flex flex-col">
        <div class="flex flex-col w-full ui-bar-d p-2">
            <input
                type="text"
                class="input input-sm squircle"
                data-theme="pastel"
                placeholder="Nombre del documento"
            />
            <div class="barui join">
                <div
                    class="select-floating join-item squircle"
                    data-theme="claude"
                >
                    <select
                        class="select select-sm join-item squircle"
                        aria-label="Oscuridad del papel"
                        id="papercol"
                    >
                        <option>100</option>
                        <option>200</option>
                        <option>300</option>
                    </select>
                    <!--label class="select-floating-label" for="papercol"
                        >Oscuridad del papel</label
                    -->
                </div>
                <label
                    class="join-item btn btn-sm btn-secondary"
                    data-theme="claude"
                    ><input type="checkbox" class="hidden peer" />
                    <Icon
                        icon="solar:text-bold-line-duotone"
                        class="w-5 h-5 peer-checked:scale-120 peer-checked:text-primary-content"
                    />
                </label>
                <label
                    class="join-item btn btn-sm btn-secondary"
                    data-theme="claude"
                    ><input type="checkbox" class="hidden peer" />
                    <Icon
                        icon="solar:text-italic-line-duotone"
                        class="w-5 h-5 peer-checked:scale-120 peer-checked:text-primary-content"
                    />
                </label>
                <label
                    class="join-item btn btn-sm btn-secondary"
                    data-theme="claude"
                    ><input type="checkbox" class="hidden peer" />
                    <Icon
                        icon="solar:text-underline-line-duotone"
                        class="w-5 h-5 peer-checked:scale-120 peer-checked:text-primary-content"
                    />
                </label>
                <label
                    class="join-item btn btn-sm btn-secondary"
                    data-theme="claude"
                    ><input type="checkbox" class="hidden peer" />
                    <Icon
                        icon="solar:text-cross-line-duotone"
                        class="w-5 h-5 peer-checked:scale-120 peer-checked:text-primary-content"
                    />
                </label>
                <div class="dropdown relative inline-flex">
                    <button
                        id="block-list"
                        class="dropdown-toggle btn btn-sm btn-primary waves waves-primary join-item squircle"
                        data-theme="claude"
                        aria-haspopup="menu"
                        aria-expanded="false"
                    >
                        <Icon
                            icon="solar:add-square-line-duotone"
                            class="w-5 h-5"
                        />
                        Bloque
                    </button>
                    <ul
                        class="dropdown-menu dropdown-open:opacity-100 hidden min-w-6"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="block-list"
                        data-theme="claude"
                    >
                        <li class="dropdown-header gap-0.5">
                            <h1>Bloques</h1>
                        </li>
                        <li>
                            <button class="btn glass text-black">
                                Titulo<Icon
                                    icon="solar:text-square-line-duotone"
                                    class="w-3 h-3"
                                />
                            </button>
                        </li>
                        <li>
                            <button class="btn glass text-black">Texto</button>
                        </li>
                        <li></li>
                    </ul>
                </div>
            </div>
            <div class="barui"></div>
        </div>
        <div
            id="block-edit"
            class="w-full flex-1 bg-base-100"
            data-theme="claude"
        ></div>
    </div>
</template>
<style></style>
