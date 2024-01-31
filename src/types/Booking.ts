export type Guest = {
  birthday: string
  ddi: string
  doc: string
  docType: string
  email: string
  id: string
  name: string
  phone: string
}

export type Guests = Guest[]

export type Booking = {
  id: string
  flagColor: string
  room: {
    displayName: string
    property: {
      name: string
    }
  }
  precheckin: {
    name: string
    doc: string
    guests: Guests
    phone: string
    email: string
    birthday: string
    visitors: Guests
  }
  custom9: string
  custom5: string
  custom2: string
  formattedArrival: string
  formattedDeparture: string
}

export type Bookings = Booking[]
