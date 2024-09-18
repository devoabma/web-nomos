import { API } from '@/lib/axios'

export interface LoginAdminBody {
  email: string
  password: string
}

export async function loginAdmin({ email, password }: LoginAdminBody) {
  await API.post('/administrator/sessions', {
    email,
    password,
  })
}
