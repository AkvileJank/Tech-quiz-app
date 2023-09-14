import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Question, Session } from '../views/QuizQuestions.vue'

const useParameterStore = defineStore(
  'parameters',
  () => {
    const category = ref('')
    const limit = ref(0)
    return { category, limit }
  },
  { persist: true }
)

const useSingleSessionStore = defineStore(
  'currentSession',
  () => {
    const date = ref<string>(new Date().toLocaleDateString('en-CA'))
    const sessionScore = ref(0)
    const sessionCategory = ref('')
    const sessionQuestions = ref<Question[]>([])

    function selectNewSession(session: Session) {
      date.value = session.date
      sessionScore.value = session.sessionScore
      sessionCategory.value = session.sessionCategory
      sessionQuestions.value = session.sessionQuestions
    }
    function createSessionObject(): Session {
      return {
        date: date.value,
        sessionScore: sessionScore.value,
        sessionCategory: sessionCategory.value,
        sessionQuestions: sessionQuestions.value
      }
    }
    return {
      date,
      sessionScore,
      sessionCategory,
      sessionQuestions,
      selectNewSession,
      createSessionObject
    }
  },
  { persist: true }
)

const useAllSessionsStore = defineStore(
  'allSessions',
  () => {
    const allSessions: Ref<Session[]> = ref([])
    function addLastSession(session: Session) {
      allSessions.value.push(session)
    }
    return { allSessions, addLastSession }
  },
  { persist: true }
)

export { useParameterStore, useSingleSessionStore, useAllSessionsStore }
