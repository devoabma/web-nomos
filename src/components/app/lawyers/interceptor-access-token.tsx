import { AxiosError } from 'axios'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { API } from '@/lib/axios'

export const InterceptorAccessToken = () => {
  // Usando o useRef para controlar a exibição do toast
  const toastDisplayed = useRef(false)

  const navigate = useNavigate()

  useEffect(() => {
    const interceptorId = API.interceptors.response.use(
      (response) => {
        // Resetar o estado caso a resposta seja bem-sucedida
        toastDisplayed.current = false

        return response
      },
      (error: AxiosError) => {
        if (error.isAxiosError) {
          const status = error.response?.status

          // Verifica se o erro é de autenticação ou autorização
          if (
            (status === 401 || status === 403 || status === 500) &&
            !toastDisplayed.current
          ) {
            // Exibe o toast e redireciona
            toast.error('Acesso Proibido!', {
              description:
                'Você precisa ser um advogado(a) e deve estar logado.',
            })

            navigate('/?error=true', { replace: true })

            // Marca que o toast foi exibido
            toastDisplayed.current = true
          }
        }
        return Promise.reject(error) // Certifique-se de rejeitar o erro
      },
    )

    return () => {
      // Remove o interceptor quando o componente for desmontado
      API.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  return null // Este componente não precisa renderizar nada
}
