<template>
  <v-container fluid style="height: 100vh">
    <v-card
      class="mx-auto"
      color="surface-variant"
      max-width="340"
      :title="detail.id"
      :subtitle="detail.value"
    >
      <template #actions>
        <v-btn
          append-icon="mdi-chevron-right"
          color="red-lighten-2"
          text="Book Activity"
          variant="outlined"
          @click="callApi"
        ></v-btn>
        <v-btn
          append-icon="mdi-chevron-right"
          color="green-lighten-2"
          text="Back"
          variant="outlined"
          @click="goBack"
        ></v-btn>
      </template>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const id = ref('')
const detail = ref({})
const router = useRouter()
const route = useRoute()

onMounted(() => {
  id.value = route.params.id
  axios.get('https://api.chucknorris.io/jokes/random').then((res) => {
    detail.value = res.data
  })
})

const callApi = () => {
  axios.get('https://api.chucknorris.io/jokes/random').then((res) => {
    console.log('hello')
    router.push('/')
  })
  window.alert('Hello')
}

const goBack = () => {
  router.push('/')
}
</script>
