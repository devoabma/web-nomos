import { API } from '@/lib/axios'

export async function registeredMetrics() {
  const response = await API.get('/lawyers/metrics/registered')

  return response.data
}
