<template>
  <v-container fluid style="margin: 0; padding: 0; padding-bottom: 100px">
    <calendar />
    <div v-if="!listComposable.bookings.length && !listComposable.isLoading">
      <v-alert type="info" elevation="1" class="ma-4">
        {{
          listComposable.list === 'bookings'
            ? 'Nenhuma reserva encontrada.'
            : listComposable.list === 'guests'
              ? 'Nenhuma pessoa encontrada.'
              : 'Nenhum veículo encontrado.'
        }}
      </v-alert>
    </div>
    <div
      v-if="
        listComposable.bookings.length &&
        !listComposable.isLoading &&
        listComposable.list === 'vehicles' &&
        !hasVehicles(listComposable.bookings)
      "
    >
      {{ !!hasVehicles(listComposable.bookings) ? 'Tem' : 'Nao tem ' }}
      <v-alert type="info" elevation="1" class="ma-4"> 'Nenhum veículo encontrado.' </v-alert>
    </div>
    <div v-if="!listComposable.isLoading">
      <bookings-list
        v-if="listComposable.list === 'bookings'"
        :bookings="listComposable.bookings"
      />
      <guests-list v-if="listComposable.list === 'guests'" :bookings="listComposable.bookings" />
      <vehicles-list
        v-if="listComposable.list === 'vehicles'"
        :bookings="listComposable.bookings"
      />
    </div>
    <v-skeleton-loader v-for="n in 12" v-else :key="n" :elevation="1" type="card" class="ma-4" />
  </v-container>
</template>

<script lang="ts" setup>
import Calendar from '@/components/home/Calendar.vue'
import BookingsList from '@/components/home/lists/BookingsList.vue'
import GuestsList from '@/components/home/lists/GuestsList.vue'
import VehiclesList from '@/components/home/lists/VehiclesList.vue'
import { useList } from '@/composables'
import { onBeforeMount } from 'vue'

const listComposable = useList()

onBeforeMount(async () => {
  await listComposable.getBookings()
})

const hasVehicles = (bookings) => {
  console.log('hasVehicles', bookings.filter((b) => b.custom2).length > 0)
  console.log(
    'vehicles',
    bookings.filter((b) => b.custom2)
  )
  return bookings.filter((b) => b.custom2.length > 0).length > 0
}
</script>
