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
      name: 'nomina',
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
    },
    {
      path: '/verEspecialidad',
      name: 'viewEspecialidad',
      component: () => import('../components/Especialidad/verEspecialidad.vue')
    },
    {
      path: '/Home',
      name: 'interfaz',
      component: () => import('../components/Inicio/interfaz.vue')
    }
    
  ]
})

export default router
