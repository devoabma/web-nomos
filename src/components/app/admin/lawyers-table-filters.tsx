import { Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function LawyersTableFilters() {
  return (
    <form className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>

      <Input
        placeholder="Nome do advogado(a)"
        className="h-8 w-full sm:w-auto"
      />

      <Input
        placeholder="Busque pelo CPF"
        className="h-8 w-full sm:w-[15rem]"
      />

      <Input
        placeholder="Busque pelo e-mail"
        className="h-8 w-full sm:w-[20rem]"
      />

      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-full text-muted-foreground sm:w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          defaultValue=""
          className="font-medium text-muted-foreground"
        >
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="pending">Pendentes</SelectItem>
          <SelectItem value="confirmed">Confirmados</SelectItem>
        </SelectContent>
      </Select>

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
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
