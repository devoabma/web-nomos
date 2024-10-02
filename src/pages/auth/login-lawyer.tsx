import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { motion } from 'framer-motion'
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex w-[21.87rem] flex-col justify-center gap-6"
        >
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar a plataforma
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe sua solicitação de acesso ao GERID
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="space-y-6"
            onSubmit={handleSubmit(handleLoginLawyer)}
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex flex-col gap-1.5"
              >
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
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex flex-col gap-1.5"
              >
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
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
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
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </>
  )
}
