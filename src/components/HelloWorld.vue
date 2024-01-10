<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="auto">
        <h1>{{ appName }}</h1>
        <h2>Hello {{ name }}</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>

import { ref, onBeforeMount } from 'vue'
//import api from '@/api/index'


const appName = ref('')
const name = 'user'



onBeforeMount(async () => {
  appName.value = 'Concierge System'
  console.log('Hello World')
})

</script>
