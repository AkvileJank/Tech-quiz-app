<script setup lang="ts">
import { ref, onMounted } from 'vue'
import allSessionsStore from '../stores/allSessionsStore'
import singleSessionStore from '../stores/singleSessionStore'
import router from '@/router'
import type { Session } from './QuizQuestions.vue'
import forScores from './for-scores.svg'
import ReturnHomeButton from '@/components/ReturnHomeButton.vue'

const { allSessions } = allSessionsStore()

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
  singleSessionStore().selectNewSession(session)
  router.push({ name: 'result' })
}

onMounted(() => {
  categorizeSessions()
})
</script>
<template>
  <div
    class="mb-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25"
  ></div>
  <div v-if="allSessions.length === 0" class="flex-col text-center">
  <p class="text-xl font-bold pt-4">No scores yet, try to solve a quiz and come back then!</p>
  <img class="max-w-xs mx-auto my-10" :src="forScores" alt="Rocket landed at a station and moon"/>
    <ReturnHomeButton :router="router"></ReturnHomeButton>
</div>
  <div v-else>
    <h1 class="text-3xl font-bold text-center pb-4">Your scores:</h1>
    <div class="md:grid grid-cols-2">
      <div
        class="m-3 md: grid-rows"
        v-for="(sessions, category) in categorizedSessions"
        :key="category"
      >
        <h2 class="text-2xl pb-4">{{ category }}</h2>
        <div v-for="session in sessions" :key="session.date">
          <div
            class="grid grid-cols-1 bg-base-200 rounded-box mb-1 p-3 text-lg md:grid-cols-2 md:justify-between"
          >
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
              <div class="flex items-center">Date: {{ session.date }}</div>
            </div>
            <div class="flex md:justify-end items-center">
              <button
                type="button"
                class="btn btn-accent btn-md w-full md:w-fit"
                @click="showAttempt(session)"
              >
                Questions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
