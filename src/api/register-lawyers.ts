import { API } from '@/lib/axios'

export interface RegisterAdminBody {
  cpf: string
  oab: string
  birth: string
}

export async function registerLawyers({ cpf, oab, birth }: RegisterAdminBody) {
  await API.post('/lawyers/register', {
    cpf,
    oab,
    birth,
  })
}
