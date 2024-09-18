import { ClipboardCheck, Loader, LogIn } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const registerForm = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  securityCode: z.string(),
})

type RegisterForm = z.infer<typeof registerForm>

export function RegisterAdmin() {
  /** Redireciona o usuário para outra página através de um click de botão */
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterForm>()

  async function handleRegisterAdmin(data: RegisterForm) {
    try {
      console.log({ data })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('Cadastro realizado com sucesso!', {
        description: 'Agora você poderá se logar na plataforma.',
      })

      navigate('/restrict/admin/login')
    } catch {
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
                <Input id="name" type="text" {...register('name')} />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Seu melhor e-mail</Label>
                <Input id="email" type="email" {...register('email')} />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password">Defina uma senha</Label>
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
              className="w-full select-none bg-amber-600 font-semibold transition-all hover:bg-amber-700"
            >
              {isSubmitting ? (
                <>
                  <Loader className="ml-1.5 h-5 w-5 animate-spin" />
                </>
              ) : (
                <>
                  Finalizar cadastro{' '}
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
