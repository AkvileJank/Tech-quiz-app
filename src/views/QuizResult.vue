<script setup lang="ts">
import { useSingleSessionStore } from '../stores/store'

const currentSession = useSingleSessionStore()
</script>

<template>
  <h1>Your score:</h1>
  <div class="radial-progress text-primary" :style="{ '--value': currentSession.sessionScore }">
    {{ `${currentSession.sessionScore}%` }}
  </div>
  <div>Date: {{ currentSession.date }}</div>
  <div>Category: {{ currentSession.sessionCategory }}</div>
  <h2>Questions:</h2>
  <div v-for="(question, index) in currentSession.sessionQuestions" :key="index">
    <div>{{ question.question }}</div>
    <div v-for="(answer, ansIndex) in question.answers" :key="ansIndex">
      {{ answer }}
    </div>
  </div>
</template>

<!-- <style scoped>
.correct {
  color: greenyellow;
}
</style> -->
