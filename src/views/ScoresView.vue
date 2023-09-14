<script setup lang="ts">
  // import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAllSessionsStore, useSingleSessionStore } from '../stores/store'
import type { Session } from './QuizQuestions.vue'

const { allSessions } = useAllSessionsStore() // add type that it should be Session[]
const currentSession: Session = storeToRefs(useSingleSessionStore())

function selectSession(session: Session) {
  currentSession.date.value = session.date
  currentSession.sessionScore.value = session.sessionScore
  currentSession.sessionCategory.value = session.sessionCategory
  currentSession.sessionQuestions.value = session.sessionQuestions
}
</script>
<template>
  <h1 class="text-3xl font-bold text-center">Your scores:</h1>
  <div v-for="(session, key) in allSessions" :key="key">
    <h2 class="text-2xl">{{ session.sessionCategory }}</h2>
    <div class="grid-cols-3 bg-base-200 rounded-box mb-1 p-3">
      <label for="score-bar">Score:</label>
      <div
        class="radial-progress text-primary text-xs"
        :style="{ '--value': session.sessionScore, '--size': '2.8rem' }"
      >
        {{ `${session.sessionScore}%` }}
      </div>

      <div>Date: {{ session.date }}</div>
      <button type="button" class="btn btn-primary btn-xs" @click="selectSession">Questions</button>
    </div>
  </div>
</template>
