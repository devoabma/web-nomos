import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const lawyersFiltersSchema = z.object({
  name: z.string().optional(),
  cpf: z.string().optional(),
  email: z.string().optional(),
})

type LawyersFiltersSchema = z.infer<typeof lawyersFiltersSchema>

export function LawyersTableFilters() {
  const [searcParams, setSearchParams] = useSearchParams()

  const name = searcParams.get('name')
  const cpf = searcParams.get('cpf')
  const email = searcParams.get('email')

  const { register, handleSubmit, reset } = useForm<LawyersFiltersSchema>({
    resolver: zodResolver(lawyersFiltersSchema),
    defaultValues: {
      name: name ?? '',
      cpf: cpf ?? '',
      email: email ?? '',
    },
  })

  function handleFilterLawyers({ name, cpf, email }: LawyersFiltersSchema) {
    setSearchParams((stateUrl) => {
      if (name) {
        stateUrl.set('name', name)
      } else {
        stateUrl.delete('name')
      }

      if (cpf) {
        stateUrl.set('cpf', cpf)
      } else {
        stateUrl.delete('cpf')
      }

      if (email) {
        stateUrl.set('email', email)
      } else {
        stateUrl.delete('email')
      }

      // Depois que filtar, voltará para a página 1
      stateUrl.set('page', '1')

      return stateUrl
    })
  }

  function handleClearFilters() {
    setSearchParams((stateUrl) => {
      stateUrl.delete('name')
      stateUrl.delete('cpf')
      stateUrl.delete('email')

      stateUrl.set('page', '1')

      return stateUrl
    })

    reset({
      name: '',
      cpf: '',
      email: '',
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilterLawyers)}
      className="flex flex-wrap items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>

      <Input
        placeholder="Nome do advogado(a)"
        className="h-8 w-full sm:w-[30rem]"
        {...register('name')}
      />

      <Input
        placeholder="Busque pelo CPF"
        className="h-8 w-full sm:w-[15rem]"
        {...register('cpf')}
      />

      <Input
        placeholder="Busque pelo e-mail"
        className="h-8 w-full sm:w-[20rem]"
        {...register('email')}
      />

      <Button
        type="submit"
        size="xs"
        variant="default"
        className="w-full sm:w-auto"
      >
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button
        type="button"
        size="xs"
        variant="outline"
        className="w-full sm:w-auto"
        onClick={handleClearFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
