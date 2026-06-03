import { createRouter, createWebHashHistory } from "vue-router";
import Main from "./../Pages/Main.vue";
import Notas from "./../Pages/Notas.vue";
import Calendario from "./../Pages/Calendario.vue";
import Edicion from "./../Pages/Edicion.vue";
import Vista from "./../Pages/Vista.vue";
//import Ajustes from "./../Pages/Ajustes.vue";
const rutas = [
    { path: "/", component: Main },
    { path: "/Notas", component: Notas },
    { path: "/Calendario", component: Calendario },
    { path: "/Edicion", component: Edicion },
    { path: "/Vista", component: Vista }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes: rutas
});
router.afterEach(async (to, from, failure) => {
    if (!failure) setTimeout(() => window.HSStaticMethods.autoInit(), 100);
});
export default router;
