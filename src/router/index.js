import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../vues/Home.vue'
import TestConnexion from '../vues/TestConnexion.vue'
import TestNotes from '../vues/TestNotes.vue'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
