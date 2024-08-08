<template>
  <v-container fluid style="height: 100vh">
    <v-data-table :headers="headers" :items="items">
      <template #item="{ item }">
        <tr>
          <td>{{ item.id }}</td>
          <td><v-btn :to="`/${item.id}`">View</v-btn></td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const headers = ref([
  {
    title: 'ID',
    align: 'start',
    sortable: false,
    key: 'id',
  },
  {
    title: 'Detalhes',
    align: 'start',
    sortable: false,
    key: 'details',
  },
])
const items = ref([])

onMounted(() => {
  axios.get('https://api.chucknorris.io/jokes/random').then((res) => {
    console.log(res.data)
    items.value = [res.data]
  })
})
</script>
