<script setup lang="ts">
import { useRoute } from 'vue-router'
import SingleSessionStore from '@/stores/singleSessionStore'

const route = useRoute()
function getSize() {
  if (route.name === 'scores') return '2.8rem'
  return '4rem'
}

const currentSession = SingleSessionStore()
</script>

<template>
  <div class="flex justify-center">
    <div
      class="radial-progress text-accent"
      :style="{ '--value': currentSession.sessionScore, '--size': getSize() }"
      :class="[route.name === 'result' ? 'text-lg' : 'text-sm']"
    >
      {{ `${currentSession.sessionScore}%` }}
    </div>
  </div>
</template>
