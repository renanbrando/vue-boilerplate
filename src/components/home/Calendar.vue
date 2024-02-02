<template>
  <v-container fluid class="container">
    <v-row no-gutters class="my-4">
      <v-col cols="2">
        <v-btn variant="text" color="white" class="mt-n1" @click="goToPreviousMonth(-1)">
          <v-icon color="white" size="35">mdi-chevron-left</v-icon>
        </v-btn>
        <span class="text-h6 mt-2">{{ currentMonth }} de {{ currentYear }}</span>
      </v-col>
      <v-spacer></v-spacer>

      <v-col cols="2" align="right">
        <v-chip variant="outlined" class="pointer" @click="toggleCalendarType">
          {{ calendarViews[selectedCalendarType].name }}
        </v-chip>
        <v-btn variant="text" color="white" class="mt-n1" @click="goToNextMonth(1)">
          <v-icon color="white" size="35">mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <table>
      <tr style="background-color: black !important">
        <th
          v-for="day in daysOfWeek"
          :key="day"
          class="white-text"
          style="background-color: black !important"
        >
          {{ day }}
        </th>
      </tr>
      <tr v-for="week in weeks" :key="week[0]">
        <td
          v-for="day in week"
          :key="`${day}-${currentMonth}`"
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
import { capitalizeFirstLetter, months, calendarViews } from '@/helpers'
import { format } from 'date-fns'
import type { CalendarTypes } from '@/helpers'

const listComposable = useList()
const currentDate = ref(new Date())
const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

const currentMonth = computed(() =>
  capitalizeFirstLetter(currentDate.value.toLocaleString('pt-BR', { month: 'long' }))
)

const selectedCalendarType = ref<CalendarTypes>('month')
const toggleCalendarType = () => {
  const calendarTypes = Object.keys(calendarViews) as CalendarTypes[]
  const currentCalendarTypeIndex = calendarTypes.indexOf(selectedCalendarType.value)
  const nextCalendarTypeIndex =
    currentCalendarTypeIndex === calendarTypes.length - 1 ? 0 : currentCalendarTypeIndex + 1
  selectedCalendarType.value = calendarTypes[nextCalendarTypeIndex]
}

const pastMonth = new Date().getMonth() === 0 ? 11 : new Date().getMonth() - 1
const nextMonth = new Date().getMonth() + 1

const currentYear = computed(() => currentDate.value.getFullYear())
const weeks = computed(() => {
  const firstDayOfMonth = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1)
  const lastDayOfMonth = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    0
  )
  const daysInMonth = lastDayOfMonth.getDate()

  let weeks = []
  let week = []
  let dayCounter = 1

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDayOfMonth.getDay()) || dayCounter > daysInMonth) {
        week.push('')
      } else {
        week.push(dayCounter)
        dayCounter++
      }
    }
    weeks.push(week)
    week = []
  }

  return weeks
})

const goToPreviousMonth = (num: number) => {
  const newMonth = currentDate.value.getMonth() + num
  if (currentDate.value.getMonth() === pastMonth) return
  if (newMonth < 0) {
    currentDate.value.setFullYear(currentDate.value.getFullYear() - 1)
    currentDate.value.setMonth(11)
  } else {
    currentDate.value.setMonth(newMonth)
  }
  currentDate.value = new Date(currentDate.value)
}

const goToNextMonth = (num: number) => {
  const newDate = currentDate.value.getMonth() + num > 11 ? 0 : currentDate.value.getMonth() + num
  if (newDate > nextMonth) return
  if (newDate === 1) currentDate.value.setDate(1)
  currentDate.value.setMonth(newDate)
  currentDate.value = new Date(currentDate.value)
}

const setDate = (date: number) => {
  listComposable.setSelectedDate(
    format(new Date(currentYear.value, months[currentMonth.value], date), 'yyyy-MM-dd')
  )
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
</style>
