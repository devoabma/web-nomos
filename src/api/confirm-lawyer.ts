import { API } from '@/lib/axios'

export interface ConfirmLawyerProps {
  lawyerId: string
}

export async function confirmLawyer({ lawyerId }: ConfirmLawyerProps) {
  await API.patch<ConfirmLawyerProps>(`/lawyer/${lawyerId}/confirm`)
}
