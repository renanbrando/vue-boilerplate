import type { Booking, Bookings } from '@/types/Booking'
import type { List, Tab, Status } from '@/types/List'
import { defineStore } from 'pinia'
import { format } from 'date-fns'
import api from '@/api'

const today = format(new Date(), 'yyyy-MM-dd')

export const useList = defineStore('list', {
  state: () => ({
    list: 'bookings' as List,
    selectedBooking: {} as Booking,
    tab: 'reservation' as Tab,
    status: 'checkin' as Status,
    selectedDate: today,
    initialProperties: JSON.parse(localStorage.getItem('user-concierge') || '{}').propertiesIds,
    propertiesIds: JSON.parse(localStorage.getItem('user-concierge') || '{}').propertiesIds,
    bookings: [] as Bookings,
    isLoading: true,
  }),
  actions: {
    toggleList(listType: List) {
      this.list = listType
    },
    isBookings() {
      return this.list === 'bookings'
    },
    isGuests() {
      return this.list === 'guests'
    },
    isVehicles() {
      return this.list === 'vehicles'
    },
    setSelectedBooking(booking: Booking) {
      this.selectedBooking = booking
    },
    setTab(tab: Tab) {
      this.tab = tab
    },

    async getBookings() {
      const dateParam = this.status === 'checkin' ? `arrivalDate` : 'departureDate'
      await api
        .get(
          `/bookings/precheckins?properties=${this.propertiesIds}&${dateParam}=${this.selectedDate}`
        )
        .then(({ data }) => {
          this.bookings = data
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    setStatus(status: Status) {
      this.isLoading = true
      this.status = status
      this.getBookings()
    },
    setPropertiesIds(propertiesIds: number[]) {
      this.isLoading = true
      this.propertiesIds = propertiesIds.length ? propertiesIds : this.initialProperties
      this.getBookings()
    },
    setSelectedDate(date: string) {
      this.isLoading = true
      this.selectedDate = date
      this.getBookings()
    },
  },
})
