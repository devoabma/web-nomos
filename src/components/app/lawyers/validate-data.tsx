import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Loader, UserRoundCheck, UserRoundX } from 'lucide-react'
import { toast } from 'sonner'

import { getProfileLawyer } from '@/api/get-profile-lawyer'
import { validateDataLawyer } from '@/api/validate-data-lawyer'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { formatFullName } from '@/utils/format-full-name'
import { formatMaskCPF } from '@/utils/format-mask-cpf'
import { formatMaskPhone } from '@/utils/format-mask-phone'

export function ValidateDataLawyer() {
  const queryClient = useQueryClient()

  const { data: lawyer } = useQuery({
    queryKey: ['profile-lawyer'],
    queryFn: getProfileLawyer,
  })

  const { mutateAsync: validateDataFn, isPending: isValidateDataPending } =
    useMutation({
      mutationFn: validateDataLawyer,
      onSuccess: () => {
        // Invalida a query 'profile-lawyer' para atualizar a informação dos dados
        queryClient.invalidateQueries({ queryKey: ['profile-lawyer'] })
      },
    })

  async function handleValidateDataLawyer() {
    try {
      await validateDataFn()

      toast.success('Dados aprovados confirmado com sucesso!', {
        description:
          'Assim que confimarem seu registro, você receberá um e-mail.',
      })
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error('Houve um erro ao confimar seus dados!', {
          description: err.response?.data.message,
        })
      }
    }
  }

  if (!lawyer) {
    return null
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader className="mt-6 rounded-xl border border-amber-400 bg-amber-50 p-4">
        <DialogTitle className="text-lg font-semibold">
          Deseja confirmar seus dados?
        </DialogTitle>
        <DialogDescription>
          Visualize as suas informações e confirme.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-2">
          <div>
            <h4 className="mb-1 text-sm font-medium text-gray-500">Nome</h4>
            <p className="text-base font-medium">
              {formatFullName(lawyer.user.name)}
            </p>
          </div>
          <div>
            <h4 className="mb-1 text-sm font-medium text-gray-500">CPF</h4>
            <p className="text-base font-medium">
              {formatMaskCPF(lawyer.user.cpf)}
            </p>
          </div>
          <div>
            <h4 className="mb-1 text-sm font-medium text-gray-500">Email</h4>
            <p className="text-base font-medium">{lawyer.user.email}</p>
          </div>
          <div>
            <h4 className="mb-1 text-sm font-medium text-gray-500">Telefone</h4>
            <p className="text-base font-medium">
              {formatMaskPhone(lawyer.user.telephone)}
            </p>
          </div>
        </div>

        <Separator orientation="horizontal" className="w-full" />

        <div className="mt-4 flex items-center justify-between gap-2">
          <Button
            variant="outline"
            disabled={isValidateDataPending}
            onClick={() => handleValidateDataLawyer()}
            className="w-full border-green-500 text-green-500 transition-colors hover:bg-green-600 hover:text-white"
          >
            {isValidateDataPending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Aprovando
              </>
            ) : (
              <>
                <UserRoundCheck className="mr-2 h-4 w-4" />
                Aprovar
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
