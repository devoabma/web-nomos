import { CheckCircle, Eye, ThumbsUp, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatFullName } from '@/utils/format-full-name'
import { formatMaskCPF } from '@/utils/format-mask-cpf'
import { formatMaskPhone } from '@/utils/format-mask-phone'

import { CopyContentField } from '../lawyers/copy-content-field'
import { LawyerConfirmRegistered } from './lawyer-confirm-registered'
import { LawyerRemoveRegistered } from './lawyer-remove-registered'
import { LawyersDetails } from './lawyers-details'

interface LawyersTableRowProps {
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

export function LawyersTableRow({ lawyers }: LawyersTableRowProps) {
  return (
    <TableRow className="overflow-x-auto">
      <TableCell className="w-full border-r sm:w-auto">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Eye className="h-4 w-4" />
              {/* Só irá mostrar quando o usuário estiver em um leitor de tela */}
              <span className="sr-only">Informações detalhadas</span>
            </Button>
          </DialogTrigger>

          {/* Modal dos detalhes do advogado */}
          <LawyersDetails lawyers={lawyers} />
        </Dialog>
      </TableCell>

      <TableCell className="w-full border-r sm:w-auto">
        {lawyers.registered ? (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            <span className="font-medium text-muted-foreground">
              Registrado
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="font-medium text-muted-foreground">Pendente</span>
          </div>
        )}
      </TableCell>

      <TableCell className="relative w-full border-r sm:w-auto">
        {formatFullName(lawyers.name)}
        <CopyContentField value={formatFullName(lawyers.name)} />
      </TableCell>

      <TableCell className="relative w-full border-r sm:w-auto">
        {formatMaskCPF(lawyers.cpf)}
        <CopyContentField value={lawyers.cpf} />
      </TableCell>

      <TableCell className="relative w-full border-r sm:w-auto">
        {lawyers.email}
        <CopyContentField value={lawyers.email} />
      </TableCell>

      <TableCell className="relative w-full border-r sm:w-auto">
        {formatMaskPhone(lawyers.telephone)}
        <CopyContentField value={lawyers.telephone} />
      </TableCell>

      <TableCell className="relative w-full border-r sm:w-auto">
        {lawyers.registered ? (
          <Button
            variant="outline"
            className="w-full cursor-auto select-none bg-green-600 text-white hover:bg-green-600 hover:text-white"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Confirmado
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full border-amber-500 text-amber-500 transition-colors hover:bg-amber-600 hover:text-white"
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                Confirmar
              </Button>
            </DialogTrigger>

            <LawyerConfirmRegistered lawyers={lawyers} />
          </Dialog>
        )}
      </TableCell>

      <TableCell className="flex w-full items-center justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="xs"
              className="flex cursor-pointer select-none items-center justify-center transition-colors hover:border-red-500 hover:text-red-500"
            >
              <X className="h-4 w-4 font-bold" />
            </Button>
          </DialogTrigger>

          <LawyerRemoveRegistered lawyers={lawyers} />
        </Dialog>
      </TableCell>
    </TableRow>
  )
}
