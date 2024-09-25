import { API } from '@/lib/axios'

export async function approvedMetrics() {
  const response = await API.get('/lawyers/metrics/approved')

  return response.data
}
