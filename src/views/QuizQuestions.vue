<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
// eslint-disable-next-line import/extensions, import/no-unresolved
import useParameterStore from '../stores/parameterStore'

type Question = {
  question: string
  answers: string[]
  id: number
}
type SelectedAnswers = Record<number, string | undefined>

const parameterStore = useParameterStore()
const { category, limit } = storeToRefs(parameterStore)

const apiURL = 'https://quizapi.io/api/v1/questions'
const apiKey = 'VNMXw5m0h0MeN7ILXS77Svnp18JIzDxHCdxnZt9g'

const showData = ref(true)

const questions = ref<Question[]>([])
const selectedAnswers = ref<SelectedAnswers>({})

const fetchQuizQuestions = async (
  chosenCategory: string,
  chosenLimit: number
) => {
  try {
    const response = await fetch(
      `${apiURL}?apiKey=${apiKey}&category=${chosenCategory}&limit=${chosenLimit}`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching quiz questions:', error)
  }
}

onMounted(async () => {
  // const difficulty = 'Easy'
  // const limit = 5
  questions.value = await fetchQuizQuestions(category.value, limit.value)
})
</script>

<template>
  <button type="button" @click="showData = !showData">Hide/show data</button>
  <div v-show="showData">{{ questions }}</div>
  <div>Category: {{ category }}</div>
  <div>Limit: {{ limit }}</div>
  <div>
    <h1>Quiz Questions:</h1>
    <div v-for="question in questions" :key="question.id">
      <p>{{ question.question }}</p>
      <div v-for="(answer, index) in question.answers" :key="index">
        <label>
          <input
            v-if="answer"
            type="radio"
            :id="`answer_${index}`"
            :name="`question_${question.id}`"
            :value="answer"
            v-model="selectedAnswers[question.id]"
          />
          {{ answer }}
        </label>
      </div>
    </div>
  </div>
</template>
