<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
// eslint-disable-next-line import/no-unresolved, import/extensions
import { useParameterStore } from '../stores/store'

const router = useRouter()
const parameterStore = useParameterStore()
const { category, limit } = storeToRefs(parameterStore)

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
    <!-- <div
      class="mt-12 mb-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100"
    ></div> -->
    <div class="mt-12 mb-5 grid h-20 card place-items-center">
      <label for="category" class="label">
        <span class="label-text text-lg">Choose amount of questions:</span>
      </label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        min="5"
        max="20"
        step="5"
        class="input input-secondary max-w-xs"
        v-model="limit"
      />
    </div>
    <!-- <div
      class="mt-12 mb-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100"
    ></div> -->
    <div class="mt-12 mb-5 grid h-20 card place-items-center">
      <button type="button" class="btn btn-outline btn-secondary" @click="goToQuiz">
        Start quiz
      </button>
    </div>
  </div>
</template>
../stores/store
