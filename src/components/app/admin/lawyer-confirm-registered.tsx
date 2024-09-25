import { DialogTitle } from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Loader, UserRoundCheck, UserRoundX } from 'lucide-react'
import { toast } from 'sonner'

import { confirmLawyer } from '@/api/confirm-lawyer'
// import type { FetchLawyersProps } from '@/api/fetch-lawyers'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { formatFullName } from '@/utils/format-full-name'
import { formatMaskCPF } from '@/utils/format-mask-cpf'
import { formatMaskPhone } from '@/utils/format-mask-phone'

interface LawyerConfirmRegisteredProps {
  lawyers: {
    id: string
    name: string
    cpf: string
    email: string
    telephone: string
  }
}

export function LawyerConfirmRegistered({
  lawyers,
}: LawyerConfirmRegisteredProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: confirmLawyerFn, isPending: isConfirmLawyerPending } =
    useMutation({
      mutationFn: confirmLawyer,
      onSuccess: () => {
        // Invalida a query 'lawyers' para atualizar a lista de advogados
        queryClient.invalidateQueries({ queryKey: ['lawyers'] })

        // Invalida a query 'registered-metrics' para refazer a requisição e obter todos os dados atualizados
        queryClient.invalidateQueries({ queryKey: ['registered-metrics'] })
      },
    })

  async function handleConfirmLawyer(lawyerId: string) {
    try {
      await confirmLawyerFn({ lawyerId })

      toast.success('Advogado(a) confirmado com sucesso!', {
        description:
          'Um e-mail será enviado ao advogado(a) com essa confirmação.',
      })
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error('Houve um erro ao confimar o advogado(a)!', {
          description: err.response?.data.message,
        })
      }
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader className="mt-6 rounded-xl border border-amber-400 bg-amber-50 p-4">
        <DialogTitle className="text-lg font-semibold">
          Deseja confirmar esse Advogado(a)?
        </DialogTitle>
        <DialogDescription>
          Visualize os dados do advogado(a) e confirme.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-2">
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
            <h4 className="mb-1 text-sm font-medium text-gray-500">Email</h4>
            <p className="text-base font-medium">{lawyers.email}</p>
          </div>
          <div>
            <h4 className="mb-1 text-sm font-medium text-gray-500">Telefone</h4>
            <p className="text-base font-medium">
              {formatMaskPhone(lawyers.telephone)}
            </p>
          </div>
        </div>

        <Separator orientation="horizontal" className="w-full" />

        <div className="mt-4 flex items-center justify-between gap-2">
          <Button
            variant="outline"
            disabled={isConfirmLawyerPending}
            onClick={() => handleConfirmLawyer(lawyers.id)}
            className="w-full border-green-500 text-green-500 transition-colors hover:bg-green-600 hover:text-white"
          >
            {isConfirmLawyerPending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Confirmando
              </>
            ) : (
              <>
                <UserRoundCheck className="mr-2 h-4 w-4" />
                Confirmar
              </>
            )}
          </Button>

          <DialogClose asChild>
            <Button variant="outline" className="w-full">
              <UserRoundX className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  )
}
