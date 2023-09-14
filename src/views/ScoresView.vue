<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAllSessionsStore, useSingleSessionStore } from '../stores/store'
import router from '@/router'
import type { Session } from './QuizQuestions.vue'

const { allSessions } = useAllSessionsStore() // add type that it should be Session[]
const currentSession = useSingleSessionStore()

const categorizedSessions = ref<Record<string, Session[]>>({})

function categorizeSessions() {
  allSessions.forEach(session => {
    if (!categorizedSessions.value[session.sessionCategory]) {
      categorizedSessions.value[session.sessionCategory] = []
    }
    categorizedSessions.value[session.sessionCategory].push(session)
  })
}

function showAttempt(session: Session) {
  currentSession.selectNewSession(session)
  router.push({ name: 'result' })
}

onMounted(() => {
  categorizeSessions()
})
</script>
<template>
  <div
    class="mb-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100"
  ></div>
  <div>
    <h1 class="text-3xl font-bold text-center pb-4">Your scores:</h1>
    <div class="md:grid grid-cols-2">
      <div
        class="m-3 md: grid-rows"
        v-for="(sessions, category) in categorizedSessions"
        :key="category"
      >
        <h2 class="text-2xl pb-4">{{ category }}</h2>
        <div v-for="session in sessions" :key="session.date">
          <div class="grid bg-base-200 rounded-box mb-1 p-3 md:grid-cols-2 md:justify-between">
            <div class="flex justify-evenly p-3 md:justify-between">
              <div>
                <label for="score-bar">Score:</label>
                <div
                  class="radial-progress text-accent text-xs m-2"
                  :style="{ '--value': session.sessionScore, '--size': '2.8rem' }"
                >
                  {{ `${session.sessionScore}%` }}
                </div>
              </div>
              <div>Date: {{ session.date }}</div>
            </div>
            <!-- <div class="flex md:justify-end"> -->
            <button type="button" class="btn btn-accent btn-xs" @click="showAttempt(session)">
              Questions
            </button>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
