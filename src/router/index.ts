import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ConfigureQuiz from '../views/ConfigureQuiz.vue'
import ScoresView from '../views/ScoresView.vue'
import QuizQuestions from '../views/QuizQuestions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/configure',
      name: 'configure',
      component: ConfigureQuiz
    },
    {
      path: '/scores',
      name: 'scores',
      component: ScoresView
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizQuestions
    }
  ]
})

export default router
