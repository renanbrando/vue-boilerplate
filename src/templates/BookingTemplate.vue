<template>
  <v-layout>
    <nav-bar
      :has-back-button="true"
      :book-id="`${listComposable.selectedBooking.id}`"
      :has-share-button="true"
      :has-delete-button="true"
      :share-content="shareContent"
    />

    <v-main style="height: 100vh; background-color: #f4f4f4; width: 100%">
      <router-view />
    </v-main>
  </v-layout>
</template>
<script lang="ts" setup>
import NavBar from '@/components/auth/NavBar.vue'
import { useList } from '@/composables'

const listComposable = useList()

const shareContent = `Reserva: ${listComposable.selectedBooking.id}
Quarto: ${listComposable.selectedBooking.room.displayName}
Nome: ${listComposable.selectedBooking.precheckin.name || ''}
Email: ${listComposable.selectedBooking.precheckin.email || ''}
Entrada: ${listComposable.selectedBooking.formattedArrival || ''}
Saída: ${listComposable.selectedBooking.formattedDeparture || ''}
Telefone: ${listComposable.selectedBooking.precheckin.phone || ''}
Documento: ${listComposable.selectedBooking.precheckin.doc || ''}
Date de nascimento: ${listComposable.selectedBooking.precheckin.birthday || ''}
Acompanhante Nome: ${listComposable.selectedBooking.precheckin.guests[0].name || ''}
Acompanhante Doc: ${listComposable.selectedBooking.precheckin.guests[0].doc || ''}
`
</script>
