<template>
  <v-row no-gutters class="mt-6 mx-6">
    <v-col v-for="book in bookings" :key="book.id" cols="12">
      <v-card
        v-if="book.custom2"
        class="mx-auto px-6 py-4 mb-3"
        rounded="lg"
        elevation="2"
        @click="goToBookingDetails(book)"
      >
        <div style="display: flex; justify-content: space-between; align-items: center">
          <div style="display: flex; align-items: center">
            <v-icon size="30" class="mr-2">mdi-car</v-icon>
            <div class="ml-2">
              <small :style="`color: #${book?.flagColor}`">{{ book?.room.property.name }}</small>
              <br />
              <span>{{ formatVehicle(book.custom2).model }}</span> -
              <span>Cor: {{ formatVehicle(book.custom2).color }}</span>
              <br />
              <small class="text-grey"> {{ formatVehicle(book.custom2).plate }}</small>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end">
            <v-icon size="30" class="mr-2">mdi-chevron-right</v-icon>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import type { Bookings, Booking } from '@/types/Booking'
import { useList } from '@/composables/useList'
import { formatVehicle } from '@/helpers'

const route = useRouter()
defineProps<{
  bookings?: Bookings
}>()

const { setSelectedBooking, setTab } = useList()

const goToBookingDetails = (book: Booking) => {
  setSelectedBooking(book as Booking)
  setTab('vehicle')

  route.push({
    name: 'Booking',
  })
}
</script>
