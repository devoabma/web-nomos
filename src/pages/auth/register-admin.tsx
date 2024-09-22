import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ClipboardCheck, Loader, LogIn } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerAdmin } from '@/api/register-admin'
import { MessageFieldError } from '@/components/app/message-field-error'
import { PasswordInput } from '@/components/app/password-input'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const registerForm = z.object({
  name: z.string().min(1, 'Campo nome é obrigatório.'),
  email: z.string().email('Insira um endereço de e-mail válido.'),
  password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres.'),
  securityCode: z.string().min(1, 'Este campo é obrigatório.'),
})

type RegisterForm = z.infer<typeof registerForm>

export function RegisterAdmin() {
  /** Redireciona o usuário para outra página através de um click de botão */
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerForm),
  })

  const { mutateAsync: registerAdminFn } = useMutation({
    mutationFn: registerAdmin,
  })

  async function handleRegisterAdmin(data: RegisterForm) {
    try {
      await registerAdminFn({
        name: data.name,
        email: data.email,
        password: data.password,
        securityCode: data.securityCode,
      })

      toast.success('Cadastro realizado com sucesso!', {
        description: 'Agora você poderá se logar na plataforma.',
      })

      navigate(`/restrict/admin/login?email=${data.email}`)
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error('Administrador já cadastrado na plataforma!', {
          description:
            'Já existe uma conta com este e-mail. Por favor, realize seu login.',
        })

        navigate(`/restrict/admin/login?email=${data.email}`)

        return
      }

      toast.error('Informações fornecidas inválidas!', {
        description: 'Você precisa de um código de segurança válido.',
      })
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />

      <div className="p-8">
        <Button
          variant="outline"
          asChild
          className="absolute right-8 top-8 border border-primary/40"
        >
          <Link to="/restrict/admin/login">
            Já possue cadastro? Entre aqui
            <LogIn className="ml-1.5 h-5 w-5" />
          </Link>
        </Button>

        <div className="container flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Cadastre-se na plataforma
            </h1>
            <p className="text-sm text-muted-foreground">
              Realize seu cadastro, visualize e confirme os Advogados(a)
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={handleSubmit(handleRegisterAdmin)}
          >
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  data-error={Boolean(errors.name)}
                  className="data-[error=true]:border-red-600 data-[error=true]:focus-visible:ring-0"
                  type="text"
                  {...register('name')}
                />
                {errors.name && (
                  <MessageFieldError>{errors.name.message}</MessageFieldError>
                )}
              </div>

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
                <Label htmlFor="password">Defina uma senha</Label>
                <Input
                  id="password"
                  data-error={Boolean(errors.password)}
                  className="data-[error=true]:border-red-600 data-[error=true]:focus-visible:ring-0"
                  type="password"
                  {...register('password')}
                />
                {errors.password && (
                  <MessageFieldError>
                    {errors.password.message}
                  </MessageFieldError>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="securityCode">Código de Segurança</Label>
                <PasswordInput
                  id="securityCode"
                  data-error={Boolean(errors.securityCode)}
                  className="data-[error=true]:border-red-600 data-[error=true]:focus-visible:ring-0"
                  {...register('securityCode')}
                />
                {errors.securityCode && (
                  <MessageFieldError>
                    {errors.securityCode.message}
                  </MessageFieldError>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={
                isSubmitting ||
                Boolean(errors.name) ||
                Boolean(errors.email) ||
                Boolean(errors.password) ||
                Boolean(errors.securityCode)
              }
              className="w-full select-none bg-amber-600 font-semibold transition-all hover:bg-amber-700"
            >
              {isSubmitting ? (
                <>
                  <Loader className="ml-1.5 h-5 w-5 animate-spin" />
                </>
              ) : (
                <>
                  Finalizar Cadastro{' '}
                  <ClipboardCheck className="ml-1.5 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
