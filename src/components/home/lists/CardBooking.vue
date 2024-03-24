<template>
  <v-card class="mx-auto px-6 py-4 mb-3" rounded="lg" elevation="2">
    <v-row no-gutters>
      <v-col cols="6">
        <small :style="`color: #${booking?.flagColor}`">{{ booking?.room?.property?.name }}</small>
        <br />
        <small>Reserva {{ booking?.id }}</small>
      </v-col>
      <v-col cols="6" class="text-right" align="right">
        <small>
          <v-icon :color="booking?.custom9.length ? 'green' : 'red'">mdi-circle</v-icon> Pré
          Check-in</small
        >
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-2">
      <v-col cols="12">
        <span class="text-subtitle-1">{{
          booking?.custom9.length
            ? booking?.precheckin?.name
            : `${booking?.firstName} ${booking?.lastName}`
        }}</span>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-2">
      <v-col cols="12">
        <span class="font-weight-bold">Apartamento: </span>
        <span>{{ formatUnit(booking?.unitName) }}</span>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-2">
      <v-col cols="12">
        <span class="font-weight-bold">{{ formatDoc(booking?.precheckin?.docType) }}: </span>
        <span>{{ booking?.precheckin?.doc || '' }}</span>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-2">
      <v-col cols="12">
        <span class="font-weight-bold">Check-in: </span
        ><span>{{ booking?.formattedArrival || '' }} {{ booking?.formatedArrivalTime || '' }}</span>
        <br />
        <span class="font-weight-bold">Checkout: </span>
        <span
          >{{ booking?.formattedDeparture || '' }} {{ booking?.formatedDepartureTime || '' }}</span
        >
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-2">
      <v-col cols="12"> <span class="font-weight-bold">Acompanhantes:</span></v-col>
      <v-col v-for="guest in booking?.precheckin?.guests" :key="guest.id" cols="12">
        <span>{{ guest.name }}</span></v-col
      >
    </v-row>
    <v-row>
      <v-col cols="12" align="center">
        <v-btn
          color="primary"
          class="mx-1 text-unset my-1"
          variant="outlined"
          rounded="xl"
          :disabled="!booking?.custom9.length"
          @click="goToBookingDetails"
          >Mais Informações</v-btn
        >
        <v-btn
          color="primary"
          class="mx-1 text-unset my-1"
          rounded="xl"
          elevation="0"
          :loading="isFinishing"
          :disabled="isFinishing || !booking?.custom9.length || !!booking?.precheckin?.checkinDone"
          @click="finishCheckin(Number(booking?.id))"
          >{{
            `${!!booking?.precheckin?.checkinDone ? 'Entrada Registrada' : ' Registrar Entrada'}`
          }}</v-btn
        >
      </v-col>
    </v-row>
    <toast ref="toastRef" />
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import api from '@/api'
import { useRouter } from 'vue-router'
import type { Booking } from '@/types/Booking'
import { useList } from '@/composables/useList'
import Toast from '@/components/Toast.vue'
import { formatUnit, formatDoc } from '@/helpers'

const route = useRouter()
const props = defineProps<{
  booking?: Booking
}>()

const { setSelectedBooking, setTab } = useList()
const isFinishing = ref(false)
const toastRef = ref()

const goToBookingDetails = () => {
  if (!props.booking?.custom9.length) return
  setSelectedBooking(props.booking as Booking)
  setTab('reservation')
  route.push({
    name: 'Booking',
  })
}

const finishCheckin = (bookId: number) => {
  isFinishing.value = true
  api
    .post(`/check-in-api/precheckin/finish/${bookId}`)
    .then(() => {
      // eslint-disable-next-line vue/no-mutating-props
      if (props.booking) props.booking.precheckin.checkinDone = new Date().toISOString()
      toastRef.value?.show('Check-in finalizado com sucesso', {
        timeout: 2000,
        color: 'green',
      })
    })
    .catch(() => {
      toastRef.value?.show('Erro ao registrar Check-in', {
        timeout: 2000,
        color: 'error',
      })
    })
    .finally(() => {
      isFinishing.value = false
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
