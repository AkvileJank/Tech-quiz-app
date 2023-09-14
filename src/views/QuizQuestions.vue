<script setup lang="ts">
import { ref, onMounted, computed} from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import {useParameterStore, useSingleSessionStore, useAllSessionsStore} from '../stores/store'



type QuestionData = {
  id: number
  question: string
  answers: string[]
  correct_answers: string[]
}
export type Question = {
  id: number
  question: string
  answers: string[]
  correctAnswer: string
  selectedAnswer?: string
  isCorrect?: boolean
}
export type Session = {
  date: Ref<string>,
  sessionScore: Ref<number>,
  sessionCategory: Ref<string>
  sessionQuestions: Ref<Question[]>
}

// export type Session = {
//   date: string,
//   sessionScore: number,
//   sessionCategory: string,
//   sessionQuestions: Question[]
// }


type SelectedAnswers = Record<number, string | undefined>

const router = useRouter()
const parameterStore = useParameterStore()

const questions = ref<Question[]>([])
const { category, limit } = storeToRefs(parameterStore)
const apiURL = 'https://quizapi.io/api/v1/questions'
const apiKey = 'VNMXw5m0h0MeN7ILXS77Svnp18JIzDxHCdxnZt9g'

const showData = ref(true)
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
const allSessionsStore = useAllSessionsStore()
const currentSession: Session = storeToRefs(useSingleSessionStore())

function setupSession() {
  currentSession.sessionScore.value = correctAnswersCount.value
  currentSession.sessionCategory.value = category.value
  currentSession.sessionQuestions.value = questions.value
}

function onSubmit() {
  setupSession()
  allSessionsStore.addLastSession(currentSession)
  router.push({name: 'result'})

}

onMounted(async () => {
  questionsData.value = await fetchQuizQuestions(category.value, limit.value)
  // this is to store only relevant question data instead the whole JSON file
  questions.value = questionsData.value.map(questionData => {
    const correctAnswerKey = Object.keys(questionData.correct_answers).find(
      key => questionData.correct_answers[key] === 'true'
    )
    const correctAnswerRetrieved = correctAnswerKey ? correctAnswerKey.replace('_correct', '') : ''
    return {
      id: questionData.id,
      question: questionData.question,
      answers: questionData.answers,
      correctAnswer: correctAnswerRetrieved
    }
  })
})
</script>

<template>
  <div
    class="mb-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100"
  ></div>
  <button type="button" @click="showData = !showData">Hide/show data</button>
  <div v-show="showData">{{ questions }}</div>
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
            :value="index"
            v-model="selectedAnswers[question.id]"
          />
          {{ answer }}
        </label>
      </div>
      <div>{{ selectedAnswers }}</div>
      <div>{{ selectedAnswers[question.id] }}</div>
    </div>
  </div>
  <button type="button" @click="onSubmit">Submit</button>
</template>
