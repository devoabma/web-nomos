import { API } from '@/lib/axios'

export async function lawyersMetrics() {
  const response = await API.get('/lawyers/metrics')

  return response.data
}
