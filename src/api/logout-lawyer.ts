import { API } from '@/lib/axios'

export async function logoutLawyer() {
  await API.post('/lawyer/logout')
}
