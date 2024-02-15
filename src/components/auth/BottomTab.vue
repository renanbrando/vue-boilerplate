<template>
  <div :class="$vuetify.display.lgAndUp ? 'fab-wrapper-desktop' : 'fab-wrapper-mobile'">
    <v-btn
      :icon="!model ? 'mdi-filter-variant' : 'mdi-close'"
      size="x-large"
      color="black"
      @click="model = !model"
    ></v-btn>
    <v-bottom-sheet v-model="model" activator="#filter" rounded="xl">
      <v-card class="py-10 rounded-top">
        <v-card-title class="text-left">Status do Check-in</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" align="center">
              <v-chip
                v-for="chip in chips"
                :key="chip.id"
                :color="listComp.status === chip.id ? 'primary' : 'grey'"
                class="mx-3"
                rounded="xl"
                label
                @click="toggleStatus(chip.id as Status)"
                >{{ chip.text }}</v-chip
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
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
import type { Status } from '@/types/List'
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
const chips = ref([
  {
    text: 'Check-in',
    id: 'checkin',
  },
  {
    text: 'Check-out',
    id: 'checkout',
  },
])

const toggleList = (listName: string) => {
  listComp.toggleList(listName as 'bookings' | 'guests' | 'vehicles')
}

const toggleStatus = async (status: Status) => {
  listComp.setStatus(status)
}
</script>
<style scoped>
.rounded-top {
  border-top-left-radius: 20px !important;
  border-top-right-radius: 20px !important;
}

.fab-wrapper-desktop {
  position: fixed;
  bottom: 10rem;
  right: 3rem;
  z-index: 9999;
}

.fab-wrapper-mobile {
  position: fixed;
  bottom: 4rem;
  right: 1rem;
  z-index: 9999;
}
</style>
