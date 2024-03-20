<template>
  <v-container fluid class="container">
    <v-row no-gutters>
      <v-col cols="12" align="right" class="mb-md-8 mb-4">
        <v-btn-toggle v-model="statusGroup" rounded="xl" class="mr-12">
          <v-btn
            v-for="chip in chips"
            :key="chip.id"
            :value="chip.id"
            class="text-unset"
            :color="listComposable.status === chip.id ? 'primary' : 'white'"
            height="45px"
            @click="toggleStatus(chip.id as Status)"
            >{{ chip.text }}</v-btn
          >
        </v-btn-toggle>
        <v-tooltip :text="showCalendar ? 'Esconder Calendário' : 'Ver Calendário'" bottom>
          <template #activator="{ props }">
            <v-btn
              variant="text"
              color="white"
              v-bind="props"
              @click="showCalendar = !showCalendar"
            >
              <v-icon color="white" size="35">{{
                showCalendar ? 'mdi-close' : 'mdi-calendar'
              }}</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </v-col>
      <v-col v-if="showCalendar" cols="2">
        <v-btn variant="text" color="white" class="mt-n2" @click="goToPreviousMonth(-1)">
          <v-icon color="white" size="35">mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <v-col v-if="showCalendar" cols="8" align="center">
        <span :class="$vuetify.display.lgAndUp ? 'text-h6' : 'text-body-1'"
          >{{ currentMonth }} de {{ currentYear }}</span
        >
      </v-col>
      <v-col v-if="showCalendar" cols="2" align="right">
        <v-btn variant="text" color="white" class="mt-n2" @click="goToNextMonth(1)">
          <v-icon color="white" size="35">mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <table v-if="showCalendar">
      <tr style="background-color: black !important">
        <th
          v-for="(day, index) in daysOfWeek"
          :key="index"
          class="white-text"
          style="background-color: black !important"
        >
          {{ day }}
        </th>
      </tr>
      <tr v-for="(week, index) in weeks" :key="index">
        <td
          v-for="(day, i) in week"
          :key="`${i}-${currentMonth}`"
          :style="
            Number(listComposable.selectedDate.split('-')[2]) === day &&
            Number(listComposable.selectedDate.split('-')[1]) - 1 === months[currentMonth]
              ? 'background-color: #c31c4a'
              : 'background-color: #000'
          "
          @click="day ? setDate(day as number) : () => {}"
        >
          {{ day }}
        </td>
      </tr>
    </table>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useList } from '@/composables'
import { capitalizeFirstLetter, months } from '@/helpers'
import { format, parseISO, subMonths } from 'date-fns'
import type { Status } from '@/types/List'

const listComposable = useList()
const currentDate = ref(new Date())
const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
const maxWeeks = ref(6)
const chips = ref([
  {
    text: 'Check-in',
    id: 'checkin',
  },
  {
    text: 'Checkout',
    id: 'checkout',
  },
])
const showCalendar = ref(true)
const statusGroup = ref('checkin')

const currentMonth = computed(() =>
  capitalizeFirstLetter(currentDate.value.toLocaleString('pt-BR', { month: 'long' }))
)

const pastMonth = new Date().getMonth() === 0 ? 11 : new Date().getMonth() - 1
const nextMonth = new Date().getMonth() + 1

const currentYear = computed(() => currentDate.value.getFullYear())

const weeks = computed(() => {
  const selectedDate = parseISO(listComposable.selectedDate)
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()

  let weeks = []
  let week = []
  let dayCounter = 1

  for (let i = 0; i < maxWeeks.value; i++) {
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDayOfMonth.getDay()) || dayCounter > daysInMonth) {
        week.push(null)
      } else {
        week.push(dayCounter++)
      }

      if (week.length === 7) {
        weeks.push(week)
        week = []
      }
    }
  }

  return weeks
})

const goToPreviousMonth = (num: number) => {
  const newMonth = currentDate.value.getMonth() + num
  const newDate = subMonths(parseISO(listComposable.selectedDate), 1)
  if (currentDate.value.getMonth() === pastMonth) return
  if (newMonth < 0) {
    currentDate.value.setFullYear(currentDate.value.getFullYear() - 1)
    currentDate.value.setMonth(11)
  } else {
    currentDate.value.setMonth(newMonth)
  }
  currentDate.value = new Date(currentDate.value)
  listComposable.selectedDate = format(newDate, 'yyyy-MM-dd')
}

const goToNextMonth = (num: number) => {
  const newDate = currentDate.value.getMonth() + num > 11 ? 0 : currentDate.value.getMonth() + num
  if (newDate > nextMonth) return
  if (newDate === 1) currentDate.value.setDate(1)
  currentDate.value.setMonth(newDate)
  currentDate.value = new Date(currentDate.value)

  const updatedDate = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1)
  listComposable.selectedDate = format(updatedDate, 'yyyy-MM-dd')
}

const setDate = (date: number) => {
  listComposable.setSelectedDate(
    format(new Date(currentYear.value, months[currentMonth.value], date), 'yyyy-MM-dd')
  )
}

const toggleStatus = async (status: Status) => {
  listComposable.setStatus(status)
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #000;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #000;
}

td {
  cursor: pointer;
  border-radius: 50px;
  padding-left: 10px;
  padding-right: 10px;
}

td:hover {
  background-color: #c31c4a;
}

.pointer {
  cursor: pointer;
}

.container {
  width: 100%;
  background-color: black;
  color: white;
  align-items: center;
  justify-content: center;
  align-content: center;
  flex: 1;
}

.text-unset {
  text-transform: unset !important;
  letter-spacing: 0px !important;
}
</style>
