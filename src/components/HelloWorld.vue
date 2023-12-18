<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="auto">
        <v-card flat title="Usuários">
          <template v-slot:text>
            <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line variant="outlined"
              hide-details></v-text-field>
          </template>

          <v-data-table :headers="(headers as any)" :items="users" :search="search"></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>

import { ref, onBeforeMount } from 'vue'
import api from '@/api/index'


const search = ref('')
const headers = [
  {
    align: 'start',
    key: 'name',
    sortable: false,
    title: 'Nome',
    value: 'Nome'
  },
  { key: 'email', title: 'E-mail', value: 'E-mail', sortable: false, align: 'start' },
  { key: 'companyId', title: 'Empresa', value: 'Empresa', sortable: false, align: 'start' },
  { key: 'lastLogin', title: 'Último Login', value: 'Último Login', sortable: false, align: 'start' },
  { key: 'status', title: 'Status', value: 'Status', sortable: false, align: 'start' },
]

const users = ref([
  {
    name: 'Renan Ribeiro Brando',
    email: 'renan@quill.com.br',
    companyId: 1,
    status: true,
    lastLogin: new Date().toISOString(),
  },
  {
    name: 'Arthur Marçal',
    email: 'arthur@quill.com.br',
    companyId: 1,
    status: true,
    lastLogin: new Date().toISOString(),
  },
  {
    name: 'Clarissa Vieira',
    email: 'clarissa@quill.com.br',
    companyId: 1,
    status: true,
    lastLogin: new Date().toISOString(),
  },
  {
    name: 'Kaio Takase',
    email: 'kaio@quill.com.br',
    companyId: 1,
    status: true,
    lastLogin: new Date().toISOString(),
  },
])

onBeforeMount(async () => {
  const response = await api.get('/users')
  console.log(response)
  users.value.push(...response.data)
})

</script>
