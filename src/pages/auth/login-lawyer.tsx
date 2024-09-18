import { ClipboardCheck, Loader, LogIn } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const loginForm = z.object({
  cpf: z.string(),
  oab: z.string().max(7),
})

type LoginForm = z.infer<typeof loginForm>

export function LoginLawyer() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginForm>()

  async function handleLoginLawyer(data: LoginForm) {
    try {
      console.log({ data })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('Login realizado com sucesso!', {
        description:
          'Consulte seu painel para gerenciar e acessar seus dados profissionais.',
      })
    } catch {
      toast.error('Credenciais fornecidas inválidas!', {
        description: 'Por favor, tente novamente.',
      })
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
          <Link to="/register">
            Nao tem cadastro? Realize aqui{' '}
            <ClipboardCheck className="ml-1.5 h-5 w-5" />
          </Link>
        </Button>

        <div className="flex w-[21.87rem] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar a plataforma
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe sua solicitação de acesso ao GERID
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={handleSubmit(handleLoginLawyer)}
          >
            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cpf">Seu CPF</Label>
                <Input id="cpf" type="text" {...register('cpf')} />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="oab">Número da OAB</Label>
                <Input id="oab" type="text" {...register('oab')} />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full select-none font-semibold transition-all"
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
