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
  cpf: z.string(),
  oab: z.string().max(7),
  birth: z.string().max(8),
})

type RegisterForm = z.infer<typeof registerForm>

export function RegisterLawyer() {
  /** Redireciona o usuário para outra página através de um click de botão */
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterForm>()

  async function handleRegisterLawyer(data: RegisterForm) {
    try {
      console.log({ data })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('Cadastro realizado com sucesso!', {
        description: 'Agora você poderá se logar na plataforma.',
      })

      navigate('/login')
    } catch {
      toast.error('Informações fornecidas inválidas!', {
        description: 'Você precisa ser um advogado(a) inscrito na OAB.',
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
          <Link to="/login">
            Já possue cadastro? Entre aqui
            <LogIn className="ml-1.5 h-5 w-5" />
          </Link>
        </Button>

        <div className="flex w-[21.87rem] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Cadastre-se na plataforma
            </h1>
            <p className="text-sm text-muted-foreground">
              Realize seu cadastro e acompanhe sua solicitação
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={handleSubmit(handleRegisterLawyer)}
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

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="birth">Data de Nascimento</Label>
                <Input id="birth" type="text" {...register('birth')} />
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
