import { API } from '@/lib/axios'

export interface FetchLawyersQuery {
  pageIndex?: number | null
  name?: string | null
  cpf?: string | null
  email?: string | null
}

export interface FetchLawyersProps {
  lawyers: {
    id: string
    name: string
    cpf: string
    oab: string
    email: string
    birth: string
    telephone: string
    informations_accepted: Date | null
    registered: Date | null
  }[]
}

export async function fetchLawyers({
  pageIndex,
  name,
  cpf,
  email,
}: FetchLawyersQuery) {
  const response = await API.get<FetchLawyersProps>('/lawyers', {
    params: {
      pageIndex,
      name,
      cpf,
      email,
    },
  })

  return response.data
}
