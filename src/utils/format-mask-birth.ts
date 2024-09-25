export function formatMaskBirth(date: string): string {
  // Remove any non-digit characters
  const cleanDate = date.replace(/\D/g, '')

  // Check if the cleaned date has 8 digits
  if (cleanDate.length !== 8) {
    return date // Return original input if it's not a valid date length
  }

  // Apply the date mask
  return cleanDate.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
}
