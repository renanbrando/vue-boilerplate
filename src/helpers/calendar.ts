export type CalendarTypes = 'month' | 'week'

export const months: { [key: string]: number } = {
  Janeiro: 0,
  Fevereiro: 1,
  Março: 2,
  Abril: 3,
  Maio: 4,
  Junho: 5,
  Julho: 6,
  Agosto: 7,
  Setembro: 8,
  Outubro: 9,
  Novembro: 10,
  Dezembro: 11,
}

export const weekDays = [
  {
    id: 1,
    name: 'Domingo',
    shortName: 'Dom',
  },
  {
    id: 2,
    name: 'Segunda',
    shortName: 'Seg',
  },
  {
    id: 3,
    name: 'Terça',
    shortName: 'Ter',
  },
  {
    id: 4,
    name: 'Quarta',
    shortName: 'Qua',
  },
  {
    id: 5,
    name: 'Quinta',
    shortName: 'Qui',
  },
  {
    id: 6,
    name: 'Sexta',
    shortName: 'Sex',
  },
  {
    id: 7,
    name: 'Sábado',
    shortName: 'Sáb',
  },
]

export const calendarViews = {
  month: {
    name: 'Ver Mensal',
  },
  week: {
    name: 'Ver Semanal',
  },
}
