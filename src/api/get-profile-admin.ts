import { API } from '@/lib/axios'

interface GetProfileAdminResponse {
  user: {
    id: string
    name: string
    email: string
  }
}

export async function getProfileAdmin() {
  const response = await API.get<GetProfileAdminResponse>('/administrator/me')

  return response.data
}
