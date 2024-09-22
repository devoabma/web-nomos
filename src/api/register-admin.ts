import { API } from '@/lib/axios'

export interface RegisterAdminBody {
  name: string
  email: string
  password: string
  securityCode: string
}

export async function registerAdmin({
  name,
  email,
  password,
  securityCode,
}: RegisterAdminBody) {
  await API.post('/administrator/register', {
    name,
    email,
    password,
    securityCode,
  })
}
