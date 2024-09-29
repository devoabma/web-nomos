import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { ClipboardCheck, Loader, LogIn } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { loginLawyers } from '@/api/login-lawyers'
import { MessageFieldError } from '@/components/app/message-field-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const loginForm = z.object({
  cpf: z.string().min(11, 'Insira um CPF válido.'),
  oab: z.string().min(1, 'Este campo é obrigatório.'),
})

type LoginForm = z.infer<typeof loginForm>

export function LoginLawyer() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginForm),
    defaultValues: {
      cpf: searchParams.get('cpf') ?? '',
      oab: searchParams.get('oab') ?? '',
    },
  })

  // Função que realizar o login do advogado(a)
  const { mutateAsync: loginLawyersFn } = useMutation({
    mutationFn: loginLawyers,
  })

  async function handleLoginLawyer(data: LoginForm) {
    try {
      await loginLawyersFn({
        cpf: data.cpf,
        oab: data.oab,
      })

      toast.success('Login realizado com sucesso!', {
        description:
          'Consulte seu painel para gerenciar e acessar seus dados profissionais.',
      })

      navigate('/dashboard')
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
                <Controller
                  control={control}
                  name="cpf"
                  render={({ field: { onChange, name, value } }) => {
                    return (
                      <PatternFormat
                        format="###.###.###-##"
                        name={name}
                        value={value}
                        onValueChange={(values) => {
                          // values.value contém o valor sem formatação
                          onChange(values.value)
                        }}
                        defaultValue=""
                        autoComplete="off"
                        allowEmptyFormatting={false}
                        data-error={Boolean(errors.cpf)}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[error=true]:border-red-600 data-[error=true]:focus-visible:ring-0"
                      />
                    )
                  }}
                />
                {errors.cpf && (
                  <MessageFieldError>{errors.cpf.message}</MessageFieldError>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="oab">Número da OAB</Label>
                <Input
                  id="oab"
                  data-error={Boolean(errors.oab)}
                  className="data-[error=true]:border-red-600 data-[error=true]:focus-visible:ring-0"
                  type="text"
                  {...register('oab')}
                />
                {errors.oab && (
                  <MessageFieldError>{errors.oab.message}</MessageFieldError>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={
                isSubmitting || Boolean(errors.cpf) || Boolean(errors.oab)
              }
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
