export const formatUnit = (text: string = '') => {
  if (text && text.length > 2) {
    return text.substring(2, text.length)
  }
  return text
}
