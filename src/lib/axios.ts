import axios from 'axios'

import { env } from '@/env'

export const API = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

// const API_DELAY = true

// if (API_DELAY) {
//   API.interceptors.request.use(async (config) => {
//     await new Promise((resolve) => setTimeout(resolve, 2000))

//     return config
//   })
// }
