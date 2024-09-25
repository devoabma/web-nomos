export function formatMaskCPF(cpf: string): string {
  // Remove any non-digit characters
  const cleanCPF = cpf.replace(/\D/g, '')

  // Check if the cleaned CPF has 11 digits
  if (cleanCPF.length !== 11) {
    return cpf // Return original input if it's not a valid CPF length
  }

  // Apply the CPF mask
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}
