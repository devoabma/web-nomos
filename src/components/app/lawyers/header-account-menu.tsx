import { useMutation, useQuery } from '@tanstack/react-query'
import { ChevronDown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { getProfileLawyer } from '@/api/get-profile-lawyer'
import { logoutLawyer } from '@/api/logout-lawyer'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatFullName } from '@/utils/format-full-name'

export function HeaderAccountMenu() {
  const navigate = useNavigate()

  const { data: lawyer } = useQuery({
    queryKey: ['profile-lawyer'],
    queryFn: getProfileLawyer,
  })

  // Desloga o administrador da aplicação
  const { mutateAsync: logoutLawyerFn, isPending: isLogoutLawyer } =
    useMutation({
      mutationFn: logoutLawyer,
      onSuccess: () => {
        // replace => força o administrador a não voltar para o página anterior
        navigate('/login?logout=true', { replace: true })
      },
    })

  async function handlelogoutLawyer() {
    try {
      await logoutLawyerFn()

      toast.success('Sessão encerrada com sucesso!', {
        description: 'Volte para plataforma quando quiser.',
      })
    } catch (err) {
      toast.error('Houve um erro ao se deslogar!', {
        description: 'Por favor, tente novamente.',
      })
    }
  }

  if (!lawyer) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          Minha conta
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex flex-col gap-1.5">
          <span>{formatFullName(lawyer.user.name)}</span>
          <span className="text-sm font-normal text-muted-foreground">
            Número da OAB: <b>{lawyer.user.oab}</b>
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          asChild
          disabled={isLogoutLawyer}
          className="flex cursor-pointer items-center justify-center gap-2 bg-red-500 text-white focus:bg-red-600 focus:text-white"
        >
          <button
            className="flex w-full items-center justify-center gap-2"
            onClick={handlelogoutLawyer}
          >
            <LogOut className="h-4 w-4" />
            <span className="font-semibold">Sair da conta</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
