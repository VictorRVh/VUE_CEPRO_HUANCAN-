import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/nomina',
      name: 'nopmina',
      component: () => import('../components/Especialidad/Nomina.vue')
    },
    {
      path: '/matricula',
      name: 'matricula',
      component: () => import('../components/Matricula/matricula.vue')
    },
    {
      path: '/registroEstudiante',
      name: 'registerStudent',
      component: () => import('../components/Registro/Estudiante.vue')
    },
    {
      path: '/registroDocente',
      name: 'registerTeacher',
      component: () => import('../components/Registro/Docente.vue')
    }
  ]
})

export default router
