<script setup lang="ts">
import { useRouter } from 'vue-router'
import welcome from './welcome.svg'

const router = useRouter()

function goToQuizConfig() {
  router.push({ name: 'configure' })
}

function goToScores() {
  router.push({name: 'scores'})
}
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <img class="h-90" :src="welcome" alt="Image with astronaut and moon" />
        <h1 class="text-4xl font-bold">Welcome to tech quizzes!</h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
          exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
        <div class="space-x-4">
          <button type="button" class="btn btn-outline btn-accent" @click="goToScores">Scores</button>
          <button type="button" class="btn btn-outline btn-secondary" @click="goToQuizConfig">
            Take quiz
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
