import { API } from '@/lib/axios'

export interface GetAllLawyersProps {
  lawyers: {
    id: string
    name: string
    cpf: string
    oab: string
    email: string
    birth: string
    telephone: string
    informations_accepted: string | null
    registered: string | null
  }[]
}

export async function getAllLawyers() {
  const response = await API.get<GetAllLawyersProps>('/lawyers/all')

  return response.data
}
