import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { ClipboardCheck, Loader, LogIn } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerLawyers } from '@/api/register-lawyers'
import { MessageFieldError } from '@/components/app/message-field-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const registerForm = z.object({
  cpf: z.string().min(11, 'Insira um CPF válido.'),
  oab: z.string().min(1, 'Este campo é obrigatório.'),
  birth: z.string().min(1, 'Este campo é obrigatório'),
})

type RegisterForm = z.infer<typeof registerForm>

export function RegisterLawyer() {
  /** Redireciona o usuário para outra página através de um click de botão */
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerForm),
    defaultValues: {
      cpf: '',
      birth: '',
    },
  })

  const { mutateAsync: registerLawyersFn } = useMutation({
    mutationFn: registerLawyers,
  })

  async function handleRegisterLawyer(data: RegisterForm) {
    try {
      await registerLawyersFn({
        cpf: data.cpf,
        oab: data.oab,
        birth: data.birth,
      })

      toast.success('Cadastro realizado com sucesso!', {
        description: 'Agora você poderá se logar na plataforma.',
      })

      navigate(`/?cpf=${data.cpf}&oab=${data.oab}`)
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error('Não podemos seguir com a solicitação!', {
          description: err.response?.data.message,
        })
      }
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
          <Link to="/">
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

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="birth">Data de Nascimento</Label>
                <Controller
                  control={control}
                  name="birth"
                  render={({ field: { onChange, name, value } }) => {
                    return (
                      <PatternFormat
                        format="##/##/####"
                        name={name}
                        value={value}
                        onValueChange={(values) => {
                          // values.value contém o valor sem formatação
                          onChange(values.value)
                        }}
                        defaultValue=""
                        autoComplete="off"
                        allowEmptyFormatting={false}
                        data-error={Boolean(errors.birth)}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[error=true]:border-red-600 data-[error=true]:focus-visible:ring-0"
                      />
                    )
                  }}
                />
                {errors.birth && (
                  <MessageFieldError>{errors.birth.message}</MessageFieldError>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={
                isSubmitting ||
                Boolean(errors.cpf) ||
                Boolean(errors.oab) ||
                Boolean(errors.birth)
              }
              className="w-full select-none font-semibold transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader className="ml-1.5 h-5 w-5 animate-spin" />
                </>
              ) : (
                <>
                  Finalizar Cadastro
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
