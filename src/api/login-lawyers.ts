import { API } from '@/lib/axios'

export interface LoginLawyersBody {
  cpf: string
  oab: string
}

export async function loginLawyers({ cpf, oab }: LoginLawyersBody) {
  await API.post('/lawyer/sessions', {
    cpf,
    oab,
  })
}
