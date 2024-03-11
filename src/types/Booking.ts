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

export type Property = {
  name: string
  id: number
}

export type Guests = Guest[]

export type Booking = {
  id: string
  flagColor: string
  unitName: string
  room: {
    displayName: string
    property: Property
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
  formatedArrivalTime: string
  formatedDepartureTime: string
  firstName: string
  lastName: string
}

export type Bookings = Booking[]
