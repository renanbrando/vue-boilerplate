<template>
  <v-card class="mx-auto px-6 py-4 mb-3" rounded="lg" elevation="2" @click="goToBookingDetails">
    <v-row no-gutters>
      <v-col cols="6">
        <small :style="`color: #${booking?.flagColor}`">{{ booking?.room?.property?.name }}</small>
        <br />
        <small>#{{ booking?.id }}</small>
      </v-col>
      <v-col cols="6" class="text-right" align="right">
        <small>
          <v-icon :color="booking?.custom9.length ? 'green' : 'red'">mdi-circle</v-icon> Pré
          Checkin</small
        >
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-2">
      <v-col cols="12">
        <span class="text-subtitle-1">{{ booking?.precheckin?.name || '' }}</span>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-2">
      <v-col cols="12">
        <span class="font-weight-bold">Apartamento: </span>
        <span>{{ booking?.room.displayName }}</span>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-2">
      <v-col cols="12">
        <span class="font-weight-bold">Doc:</span> <span>{{ booking?.precheckin?.doc || '' }}</span>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-2">
      <v-col cols="12">
        <span class="font-weight-bold">Check-in: </span
        ><span>{{ booking?.formattedArrival || '' }}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span class="font-weight-bold">Check-out: </span>
        <span>{{ booking?.formattedDeparture || '' }}</span>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-2">
      <v-col cols="12"> <span class="font-weight-bold">Acompanhante & Hóspedes:</span></v-col>
      <v-col v-for="guest in booking?.precheckin?.guests" :key="guest.id" cols="12">
        <span>{{ guest.name }}</span></v-col
      >
    </v-row>
    <v-row>
      <v-col cols="12" align="center">
        <v-btn
          color="primary"
          class="mx-1 text-unset"
          variant="outlined"
          rounded="xl"
          @click="goToBookingDetails"
          >Mais Informações</v-btn
        >
        <v-btn color="primary" class="mx-1 text-unset" rounded="xl" elevation="0"
          >Realizar Check-in</v-btn
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import type { Booking } from '@/types/Booking'
import { useList } from '@/composables/useList'

const route = useRouter()
const props = defineProps<{
  booking?: Booking
}>()

const { setSelectedBooking, setTab } = useList()

const goToBookingDetails = () => {
  setSelectedBooking(props.booking as Booking)
  setTab('reservation')
  route.push({
    name: 'Booking',
  })
}
</script>
<style lang="scss" scoped>
.text-unset {
  text-transform: unset !important;
  letter-spacing: 0px !important;
  color: #d4aaff;
}
</style>
