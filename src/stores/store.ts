import { ref } from 'vue'
import type {Ref} from 'vue'
import { defineStore } from 'pinia';
import type { Question, Session} from '../views/QuizQuestions.vue'

const useParameterStore = defineStore(
  'parameters',
  () => {
    const category = ref('')
    const limit = ref(0)
    return { category, limit }
  },
  { persist: true }
)
//  type Session = {
//   date: Ref<string>,
//   sessionScore: Ref<number>,
//   sessionCategory: Ref<string>
//   sessionQuestions: Ref<Question[]>
// }

const useSingleSessionStore = defineStore(
  'currentSession', () => {
    const currentSession: Session = {
      date: ref(new Date().toLocaleDateString('en-CA')),
      sessionScore: ref(0),
      sessionCategory: ref(''),
      sessionQuestions: ref<Question[]>([])
    }
    return currentSession
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
    return {allSessions, addLastSession}
  },
  { persist: true }
)


export { useParameterStore, useSingleSessionStore, useAllSessionsStore }
