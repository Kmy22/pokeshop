import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../vues/Home.vue'
import TestConnexion from '../vues/TestConnexion.vue'
import TestNotes from '../vues/TestNotes.vue'
import Boutique from '../vues/Boutique.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/TestConnexion',
    name: 'TestConnexion',
    component: TestConnexion
  },
  {
    path: '/TestNotes',
    name: 'TestNotes',
    component: TestNotes
  },
  {
    path: '/Boutique',
    name: 'Boutique',
    component: Boutique
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
