<template>
  <v-row no-gutters class="mt-6 mx-6">
    <v-col v-for="book in bookings" :key="book.id" cols="12">
      <CardBooking :booking="book" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import CardBooking from './CardBooking.vue'
import type { Bookings } from '@/types/Booking'

defineProps<{
  bookings?: Bookings
}>()
</script>
