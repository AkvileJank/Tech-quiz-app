<script setup lang="ts">
import singleSessionStore from '@/stores/singleSessionStore'
import type { Question } from '../QuizQuestions.vue'

const currentSession = singleSessionStore()

function isCorrectAnswer(answerKey: string, question: Question) {
  if (
    (answerKey === question.selectedAnswer && question.isCorrect) ||
    answerKey === question.correctAnswer
  )
    return 'correct'
  if (answerKey === question.selectedAnswer && !question.isCorrect) return 'incorrect'
  return null
}
</script>
<template>
  <div v-for="(question, key) in currentSession.sessionQuestions" :key="key">
    <h2 class="text-xl font-bold pb-4">{{ `Question ${key + 1}` }}</h2>
    <p class="text-lg pb-3">{{ question.question }}</p>
    <div class="mb-4">
      <div
        v-for="(answer, index) in question.answers"
        :key="index"
        :class="{
          'bg-green-700': isCorrectAnswer(index, question) === 'correct',
          'bg-red-900': isCorrectAnswer(index, question) === 'incorrect'
        }"
        class="flex items-center pl-4 py-1.5 border rounded-2xl border-gray-700 mb-1.5"
      >
        <p class="text-base">
          {{ answer }}
        </p>
        <div>{{ isCorrectAnswer(answer, question) }}</div>
      </div>
    </div>
  </div>
</template>
