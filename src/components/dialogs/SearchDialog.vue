<template>
  <v-dialog v-model="searchDialog" fullscreen>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          label="Buscar"
          clearable
          variant="underlined"
          @update:focused="filterBookings"
          @update:model-value="filterBookings"
          @keyup="filterBookings"
        >
          <template #prepend>
            <v-btn color="grey" variant="text" @click="close">
              <v-icon size="28">mdi-arrow-left</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-card-title>
      <v-card-text>
        <v-row no-gutters class="mt-6 mx-6">
          <v-col v-for="book in filteredBookings" :key="book.id" cols="12">
            <CardBooking :booking="book" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CardBooking from '@/components/home/lists/CardBooking.vue'
import { useList } from '@/composables'

const search = ref('')
const searchDialog = ref(false)
const listComposable = useList()
const filteredBookings = ref(listComposable.bookings)

const close = () => {
  searchDialog.value = false
}

const openSearchDialog = () => {
  searchDialog.value = true
}

const filterBookings = () => {
  if (!search.value) {
    filteredBookings.value = listComposable.bookings
    return
  }
  filteredBookings.value = listComposable.bookings.filter((booking: any) =>
    Object.values(booking).some(
      (value) =>
        typeof value === 'string' && value.toLowerCase().includes(search.value.toLowerCase())
    )
  )
}

defineExpose({
  openSearchDialog,
})
</script>
