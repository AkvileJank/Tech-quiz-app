<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'
import singleSessionStore from '@/stores/singleSessionStore'
import parameterStore from '../stores/parameterStore'
import allSessionsStore from '@/stores/allSessionsStore'

type QuestionData = {
  id: number
  question: string
  answers: Record<string, string>
  correct_answers: string[]
}
export type Question = {
  id: number
  question: string
  answers: Record<string, string>
  correctAnswer: string
  selectedAnswer?: string
  isCorrect?: boolean
}

export type Session = {
  date: string
  sessionScore: number
  sessionCategory: string
  sessionQuestions: Question[]
}

type SelectedAnswers = Record<number, string | undefined>
const dataLoaded = ref(false)

const questions = ref<Question[]>([])
const { category, limit } = storeToRefs(parameterStore())
const apiURL = 'https://quizapi.io/api/v1/questions'
const apiKey = 'VNMXw5m0h0MeN7ILXS77Svnp18JIzDxHCdxnZt9g'

// const showData = ref(true)
const questionsData = ref<QuestionData[]>([])
const selectedAnswers = ref<SelectedAnswers>({})

const fetchQuizQuestions = async (chosenCategory: string, chosenLimit: number) => {
  try {
    const apiCallURL =
      category.value === 'Randomize'
        ? `${apiURL}?apiKey=${apiKey}&limit=${chosenLimit}&multiple=false`
        : `${apiURL}?apiKey=${apiKey}&category=${chosenCategory}&limit=${chosenLimit}&multiple=false`
    const response = await fetch(apiCallURL)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    dataLoaded.value = true
    return data
  } catch (error) {
    console.error('Error fetching quiz questions:', error)
  }
}

const correctAnswersCount = computed(() => {
  let count = 0
  questions.value.forEach(question => {
    const selectedAnswer = selectedAnswers.value[question.id]
    question.selectedAnswer = selectedAnswer
    if (selectedAnswer && selectedAnswer === question.correctAnswer) {
      //  insert logic to add attribute of answeredCorrectly: true/false to the question
      question.isCorrect = true
      count += 1
    } else {
      question.isCorrect = false
    }
  })
  const percentage = (count / questions.value.length) * 100
  return Math.round(percentage)
})

const { sessionScore, sessionCategory, sessionQuestions } = storeToRefs(singleSessionStore())

function updateSession() {
  sessionScore.value = correctAnswersCount.value
  sessionCategory.value = category.value
  sessionQuestions.value = questions.value
}

function onSubmit() {
  updateSession()
  const sessionObj = singleSessionStore().createSessionObject()
  allSessionsStore().addLastSession(sessionObj)
  router.push({ name: 'result' })
}

const totalAnswered = ref(0)

onMounted(async () => {
  questionsData.value = await fetchQuizQuestions(category.value, limit.value)
  // this is to store only relevant question data instead the whole JSON file
  questions.value = questionsData.value.map(questionData => {
    const correctAnswerKey = Object.keys(questionData.correct_answers).find(
      key => questionData.correct_answers[key] === 'true'
    )
    const correctAnswerRetrieved = correctAnswerKey ? correctAnswerKey.replace('_correct', '') : ''
    // to remove answer options without any text - API always provides answers until 'answer_f' even if it's empty
    const filteredAnswers = Object.entries(questionData.answers).reduce(
      (acc, [key, value]) => {
        if (value !== null && value.trim() !== '') {
          acc[key] = value as string
        }
        return acc
      },
      {} as Record<string, string>
    )
    return {
      id: questionData.id,
      question: questionData.question,
      answers: filteredAnswers,
      correctAnswer: correctAnswerRetrieved
    }
  })
})
</script>

<template>
  <div
    class="mb-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100"
  ></div>
  <div v-show="dataLoaded" class="m-5">
    <h1 class="text-xl pb-5 text-center">Category: {{ category }}</h1>
    <div v-for="(question, key) in questions" :key="key">
      <h2 class="text-xl font-bold py-4">{{ `Question ${key + 1}` }}</h2>
      <p class="text-lg pb-3">{{ question.question }}</p>
      <div class="mb-4">
        <div
          v-for="(answer, index) in question.answers"
          :key="index"
          class="flex items-center pl-4 py-1.5 border rounded-2xl border-gray-700 mb-1.5"
        >
          <label class="text-base">
            <input
              v-if="answer"
              type="radio"
              :id="index"
              :name="`question_${question.id}`"
              :value="index"
              v-model="selectedAnswers[question.id]"
              @change="totalAnswered+=1"
              class="radio radio-secondary radio-sm py-1"
            />
            {{ answer }}
          </label>
        </div>
      </div>
    </div>
    <div class="flex justify-center mb-5">
      <button :disabled="totalAnswered !== questions.length" type="button" class="btn btn-secondary" @click="onSubmit">
        Finish quiz
      </button>
    </div>
  </div>
</template>
