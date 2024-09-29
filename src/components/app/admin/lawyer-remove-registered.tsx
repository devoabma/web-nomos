import { DialogTitle } from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Loader, UserRoundX } from 'lucide-react'
import { toast } from 'sonner'

import { removeLawyer } from '@/api/remove-lawyer'
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

interface LawyerRemoveRegisteredProps {
  lawyers: {
    id: string
    name: string
    cpf: string
    email: string
    telephone: string
  }
}

export function LawyerRemoveRegistered({
  lawyers,
}: LawyerRemoveRegisteredProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: removeLawyerFn, isPending: isRemoveLawyerPending } =
    useMutation({
      mutationFn: removeLawyer,
      onSuccess: () => {
        // Invalida a query 'lawyers' para atualizar a lista de advogados
        queryClient.invalidateQueries({ queryKey: ['lawyers'] })

        // Invalida a query 'registered-metrics' para refazer a requisição e obter todos os dados atualizados
        queryClient.invalidateQueries({
          queryKey: ['registered-metrics'],
        })

        queryClient.invalidateQueries({
          queryKey: ['approved-metrics'],
        })
      },
    })

  async function handleRemoveLawyer(lawyerId: string) {
    try {
      await removeLawyerFn({ lawyerId })

      toast.success('Advogado(a) removido com sucesso!', {
        description: 'Agora ele(a) poderá confirmar seus dados novamente.',
      })
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error('Houve um erro ao remover o advogado(a)!', {
          description: err.response?.data.message,
        })
      }
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader className="mt-6 rounded-xl border border-red-400 bg-red-50 p-4">
        <DialogTitle className="text-lg font-semibold">
          Deseja remover esse Advogado(a)?
        </DialogTitle>
        <DialogDescription>
          Essa ação remove o advogado(a) e faz com que ele(a) aprove novamente
          seus dados.
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
            disabled={isRemoveLawyerPending}
            onClick={() => handleRemoveLawyer(lawyers.id)}
            className="w-full border-red-500 text-red-500 transition-colors hover:bg-red-600 hover:text-white"
          >
            {isRemoveLawyerPending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Removendo
              </>
            ) : (
              <>
                <UserRoundX className="mr-2 h-4 w-4" />
                Remover
              </>
            )}
          </Button>

          <DialogClose asChild>
            <Button variant="outline" className="w-full">
              Cancelar
            </Button>
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  )
}
