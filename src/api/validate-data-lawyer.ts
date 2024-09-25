import { API } from '@/lib/axios'

export async function validateDataLawyer() {
  await API.patch('/lawyer/approved')
}
