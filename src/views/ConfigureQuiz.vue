<script setup lang="ts">
import { storeToRefs } from 'pinia'
import router from '@/router'
import parameterStore from '@/stores/parameterStore'

const { category, limit } = storeToRefs(parameterStore())

function goToQuiz() {
  router.push({ name: 'quiz' })
}
</script>

<template>
  <div
    class="mb-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100"
  ></div>
  <div class="flex flex-col w-full">
    <div class="mb-5 grid h-20 card place-items-center">
      <div class="form-control w-full max-w-xs flex flex-col">
        <label for="category" class="label">
          <span class="label-text text-lg">Category:</span>
        </label>
        <select
          id="category"
          class="select select-secondary w-full max-w-xs text-base"
          v-model="category"
        >
          <option disabled selected>Select category for quiz</option>
          <option>Randomize</option>
          <option>Linux</option>
          <option>BASH</option>
          <option>Docker</option>
          <option>DevOps</option>
        </select>
      </div>
    </div>
    <div class="mt-12 mb-5 grid h-20 card place-items-center">
      <label for="category" class="label">
        <span class="label-text text-lg">Choose amount of questions:</span>
      </label>
      <div class="text-xl mt-5">{{ limit }}</div>
      <input
        type="range"
        min="1"
        max="20"
        v-model="limit"
        class="range range-secondary w-60 mt-3"
      />
    </div>
    <div class="mt-12 mb-5 grid h-20 card place-items-center">
      <button type="button" class="btn btn-outline btn-secondary" @click="goToQuiz">
        Start quiz
      </button>
    </div>
  </div>
</template>
../stores/store ../stores/parameterStore
