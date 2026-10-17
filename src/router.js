import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import PasilloView from './views/PasilloView.vue'
import CartasView from './views/CartasView.vue'
import CartaView from './views/CartaView.vue'
import FinalView from './views/FinalView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/pasillo', component: PasilloView },
    { path: '/cartas', component: CartasView },
    { path: '/cartas/:slug', component: CartaView, props: true },
    { path: '/final', component: FinalView }
  ],
  scrollBehavior: () => ({ top: 0 })
})
