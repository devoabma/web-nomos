import { API } from '@/lib/axios'

export async function logoutAdmin() {
  await API.post('/administrador/logout')
}
