import { CalendarDays } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { formatFullName } from '@/utils/format-full-name'

export function LawyersDetails() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Informações do Advogado(a)</DialogTitle>
        <DialogDescription>Detalhes da aprovação dos dados</DialogDescription>
      </DialogHeader>
      <div className="mt-4">
        <Card className="mb-4 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-blue-700">
              <CalendarDays className="h-4 w-4" />
              <span className="text-sm font-medium">Data de Aprovação</span>
            </div>
            <p className="mt-1 text-lg font-bold text-blue-800">
              15 de junho de 2023 às 14:30
            </p>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <div>
            <h4 className="mb-1 text-sm font-medium text-gray-500">Nome</h4>
            <p className="text-base font-medium">
              {formatFullName('DALENE FERREIRA MELO DOS SANTOS')}
            </p>
          </div>
          <div>
            <h4 className="mb-1 text-sm font-medium text-gray-500">CPF</h4>
            <p className="text-base font-medium">604.951.933-13</p>
          </div>
          <div>
            <h4 className="mb-1 text-sm font-medium text-gray-500">Email</h4>
            <p className="text-base font-medium">dalenefmeloadv@gmail.com</p>
          </div>
          <div>
            <h4 className="mb-1 text-sm font-medium text-gray-500">Telefone</h4>
            <p className="text-base font-medium">(98) 98329-1170</p>
          </div>
        </div>
      </div>
    </DialogContent>
  )
}
