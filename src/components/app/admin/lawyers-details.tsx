import 'dayjs/locale/pt-br'

import dayjs from 'dayjs'
import { CalendarDays } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { formatFullName } from '@/utils/format-full-name'
import { formatMaskCPF } from '@/utils/format-mask-cpf'
import { formatMaskPhone } from '@/utils/format-mask-phone'

dayjs.locale('pt-br')

interface LawyersDetailsProps {
  lawyers: {
    id: string
    name: string
    cpf: string
    oab: string
    email: string
    birth: string
    telephone: string
    informations_accepted: Date | null
    registered: Date | null
  }
}

export function LawyersDetails({ lawyers }: LawyersDetailsProps) {
  const formattedDateRegistered = dayjs(lawyers.registered).format(
    'D [de] MMMM [de] YYYY [às] HH:mm[h]',
  )

  const formattedDateInformationAccpet = dayjs(
    lawyers.informations_accepted,
  ).format('D [de] MMMM [de] YYYY [às] HH:mm[h]')

  return (
    <>
      {lawyers.registered ? (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Informações do Advogado(a)</DialogTitle>
            <DialogDescription>
              Detalhes da confirmação do registro no GERID
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Card className="mb-4 border-green-200 bg-green-50">
              <CardContent className="space-y-2 pt-6">
                <div className="flex items-center space-x-2 text-green-700">
                  <CalendarDays className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Data da Confirmação do Registro
                  </span>
                </div>
                <p className="text-lg font-bold text-green-800">
                  {formattedDateRegistered}
                </p>

                <Separator orientation="horizontal" />

                <div className="flex items-center space-x-2 text-sky-700">
                  <CalendarDays className="h-3 w-3" />
                  <span className="text-xs font-medium">
                    Data de Aprovação do Advogado(a)
                  </span>
                </div>
                <p className="text-xs font-bold text-sky-700">
                  {formattedDateInformationAccpet}
                </p>
              </CardContent>
            </Card>
            <div className="space-y-4">
              <div>
                <h4 className="mb-1 text-sm font-medium text-gray-500">Nome</h4>
                <p className="text-base font-medium">
                  {formatFullName(lawyers.name)}
                </p>
              </div>
              <div>
                <h4 className="mb-1 text-sm font-medium text-gray-500">CPF</h4>
                <p className="text-base font-medium">
                  {formatMaskCPF(lawyers.cpf)}
                </p>
              </div>
              <div>
                <h4 className="mb-1 text-sm font-medium text-gray-500">
                  Email
                </h4>
                <p className="text-base font-medium">{lawyers.email}</p>
              </div>
              <div>
                <h4 className="mb-1 text-sm font-medium text-gray-500">
                  Telefone
                </h4>
                <p className="text-base font-medium">
                  {formatMaskPhone(lawyers.telephone)}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Informações do Advogado(a)</DialogTitle>
            <DialogDescription>
              Detalhes da aprovação dos dados
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Card className="mb-4 border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2 text-blue-700">
                  <CalendarDays className="h-4 w-4" />
                  <span className="text-sm font-medium">Data de Aprovação</span>
                </div>
                <p className="mt-1 text-lg font-bold text-blue-800">
                  {formattedDateInformationAccpet}
                </p>
              </CardContent>
            </Card>
            <div className="space-y-4">
              <div>
                <h4 className="mb-1 text-sm font-medium text-gray-500">Nome</h4>
                <p className="text-base font-medium">
                  {formatFullName(lawyers.name)}
                </p>
              </div>
              <div>
                <h4 className="mb-1 text-sm font-medium text-gray-500">CPF</h4>
                <p className="text-base font-medium">
                  {formatMaskCPF(lawyers.cpf)}
                </p>
              </div>
              <div>
                <h4 className="mb-1 text-sm font-medium text-gray-500">
                  Email
                </h4>
                <p className="text-base font-medium">{lawyers.email}</p>
              </div>
              <div>
                <h4 className="mb-1 text-sm font-medium text-gray-500">
                  Telefone
                </h4>
                <p className="text-base font-medium">
                  {formatMaskPhone(lawyers.telephone)}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      )}
    </>
  )
}
