import { API } from '@/lib/axios'

export interface RemoveLawyerProps {
  lawyerId: string
}

export async function removeLawyer({ lawyerId }: RemoveLawyerProps) {
  await API.patch<RemoveLawyerProps>(`/lawyer/${lawyerId}/remove`)
}
