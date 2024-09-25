export function formatMaskPhone(phone: string): string {
  // Remove any non-digit characters
  const cleanPhone = phone.replace(/\D/g, '')

  // Check if the cleaned phone number has 9 digits
  if (cleanPhone.length !== 9) {
    return phone // Return original input if it's not a valid phone number length
  }

  // Apply the phone number mask
  return cleanPhone.replace(/(\d{5})(\d{4})/, '$1-$2')
}
