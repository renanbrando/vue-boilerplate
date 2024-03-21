export const capitalizeFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

export const formatDoc = (text: string = '') => {
  switch (text) {
    case 'CPF':
      return 'CPF'
    case 'RG':
      return 'RG'
    case 'PASSPORT':
      return 'Passaporte'
    case 'Passaporte':
      return 'Passaporte'
    default:
      return 'Doc'
  }
}
