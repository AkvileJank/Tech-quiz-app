<script setup lang="ts">
import welcome from './welcome.svg'
import router from '@/router'

function goToQuizConfig() {
  router.push({ name: 'configure' })
}

function goToScores() {
  router.push({ name: 'scores' })
}
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content pt-0 text-center flex-col md:flex-row">
      <div class="md:flex justify-center">
        <img
          class="object-scale-down max-w-xs md:max-w-lg"
          :src="welcome"
          alt="Image with astronaut and moon"
        />
      </div>
      <div class="max-w-md">
        <h1 class="text-4xl font-bold">Welcome to tech quizzes!</h1>
        <p class="py-4">
          Test your technical knowledge by solving a quiz based on a chosen tech category.
        </p>
        <div class="space-x-4">
          <button type="button" class="btn btn-outline btn-accent" @click="goToScores">
            Scores
          </button>
          <button type="button" class="btn btn-outline btn-secondary" @click="goToQuizConfig">
            Take quiz
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
