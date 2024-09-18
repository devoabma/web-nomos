import { Eye, ThumbsUp } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatFullName } from '@/utils/format-full-name'

import { CopyContentField } from '../lawyers/copy-content-field'
import { LawyersDetails } from './lawyers-details'

export function LawyersTableRow() {
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
          <LawyersDetails />
        </Dialog>
      </TableCell>

      <TableCell className="w-full border-r sm:w-auto">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </TableCell>

      <TableCell className="relative w-full border-r sm:w-auto">
        {formatFullName('DALENE FERREIRA MELO DOS SANTOS')}
        <CopyContentField
          value={formatFullName('DALENE FERREIRA MELO DOS SANTOS')}
        />
      </TableCell>

      <TableCell className="relative w-full border-r sm:w-auto">
        604.951.933.13
        <CopyContentField value="604.951.933.13" />
      </TableCell>

      <TableCell className="relative w-full border-r sm:w-auto">
        dalenefmeloadv@gmail.com
        <CopyContentField value="dalenefmeloadv@gmail.com" />
      </TableCell>

      <TableCell className="relative w-full border-r sm:w-auto">
        (98) 98329-1170
        <CopyContentField value="98983291170" />
      </TableCell>

      <TableCell className="flex w-full items-center justify-center sm:w-auto">
        <Button
          variant="outline"
          className="border-amber-500 text-amber-500 transition-colors hover:bg-amber-600 hover:text-white"
        >
          <ThumbsUp className="mr-2 h-4 w-4" />
          Confirmar
        </Button>
      </TableCell>
    </TableRow>
  )
}
