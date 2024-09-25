import { API } from '@/lib/axios'

interface GetProfileLawyerResponse {
  user: {
    id: string
    name: string
    cpf: string
    oab: string
    email: string
    telephone: string
    informations_accepted: string
    registered: string
  }
}

export async function getProfileLawyer() {
  const response = await API.get<GetProfileLawyerResponse>('/lawyer/me')

  return response.data
}
