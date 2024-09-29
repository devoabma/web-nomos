import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { ClipboardCheck, Loader, LogIn } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { loginAdmin } from '@/api/login-admin'
import { MessageFieldError } from '@/components/app/message-field-error'
import { PasswordInput } from '@/components/app/password-input'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const loginForm = z.object({
  email: z.string().email('Insira um endereço de e-mail válido.'),
  password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres.'),
})

type LoginForm = z.infer<typeof loginForm>

export function LoginAdmin() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginForm),
    defaultValues: {
      // O campo já vem preenchido do cadastro
      email: searchParams.get('email') ?? '',
    },
  })

  // Função que realiza o login do administrador
  const { mutateAsync: authAdmin } = useMutation({
    mutationFn: loginAdmin,
  })

  async function handleLoginAdmin(data: LoginForm) {
    try {
      await authAdmin({
        email: data.email,
        password: data.password,
      })

      toast.success('Login realizado com sucesso!', {
        description:
          'Consulte seu painel para gerenciar e registar os advogados cadastrados.',
      })

      navigate('/restrict/admin')
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error('Não foi possível processar sua solicitação!', {
          description: err.response?.data.message,
        })
      }
    }
  }
  return (
    <>
      <Helmet title="Login" />

      <div className="p-8">
        <Button
          variant="outline"
          asChild
          className="absolute right-8 top-8 border border-primary/40"
        >
          <Link to="/restrict/admin/register">
            Nao tem cadastro? Realize aqui{' '}
            <ClipboardCheck className="ml-1.5 h-5 w-5" />
          </Link>
        </Button>

        <div className="container flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar a Plataforma
            </h1>
            <p className="text-sm text-muted-foreground">
              Visualize e confirme o registro dos Advogados(a) no GERID
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(handleLoginAdmin)}>
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Seu melhor e-mail</Label>
                <Input
                  id="email"
                  data-error={Boolean(errors.email)}
                  className="data-[error=true]:border-red-600 data-[error=true]:focus-visible:ring-0"
                  type="email"
                  {...register('email')}
                />
                {errors.email && (
                  <MessageFieldError>{errors.email.message}</MessageFieldError>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password">Sua senha</Label>
                <PasswordInput
                  id="password"
                  data-error={Boolean(errors.password)}
                  className="data-[error=true]:border-red-600 data-[error=true]:focus-visible:ring-0"
                  {...register('password')}
                />
                {errors.password && (
                  <MessageFieldError>
                    {errors.password.message}
                  </MessageFieldError>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={
                isSubmitting ||
                Boolean(errors.email) ||
                Boolean(errors.password)
              }
              className="w-full select-none bg-amber-600 font-semibold transition-colors hover:bg-amber-700"
            >
              {isSubmitting ? (
                <>
                  <Loader className="ml-1.5 h-5 w-5 animate-spin" />
                </>
              ) : (
                <>
                  Entrar <LogIn className="ml-1.5 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
