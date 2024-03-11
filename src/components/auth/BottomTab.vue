<template>
  <v-bottom-navigation v-model="bottomNav" active color="primary" elevation="3">
    <v-btn width="33%" @click="toggleList('bookings')">
      <v-icon>mdi-weather-night</v-icon>
      Reservas
    </v-btn>

    <v-btn width="33%" @click="toggleList('guests')">
      <v-icon>mdi-account-multiple</v-icon>
      Pessoas
    </v-btn>

    <v-btn width="33%" @click="toggleList('vehicles')">
      <v-icon>mdi-car</v-icon>
      <span>Veículos</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts" setup>
import { useList } from '@/composables'
import { ref, watch } from 'vue'

const extended = ref(false)
const model = ref(false)

const bottomOpts = {
  bookings: 0,
  guests: 1,
  vehicles: 2,
}

watch(model, () => {
  if (!model.value) {
    extended.value = false
  }
})

const listComp = useList()
const bottomNav = ref(bottomOpts[listComp.list])

const toggleList = (listName: string) => {
  listComp.toggleList(listName as 'bookings' | 'guests' | 'vehicles')
}
</script>
