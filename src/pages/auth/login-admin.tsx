import { useMutation } from '@tanstack/react-query'
import { ClipboardCheck, Loader, LogIn } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { loginAdmin } from '@/api/login-admin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const loginForm = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type LoginForm = z.infer<typeof loginForm>

export function LoginAdmin() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginForm>()

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
      toast.error('Credenciais fornecidas inválidas!', {
        description: 'Por favor, tente novamente.',
      })

      console.log(err)
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
                <Input id="email" type="email" {...register('email')} />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password">Sua senha</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
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
