import { useMutation, useQuery } from '@tanstack/react-query'
import { ChevronDown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { getProfileAdmin } from '@/api/get-profile-admin'
import { logoutAdmin } from '@/api/logout-admin'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'

export function HeaderAccountMenu() {
  const navigate = useNavigate()

  // Busca as informação do administrador logado
  const { data: profile, isLoading: isLoadindProfile } = useQuery({
    // Identifica unicamente a requisção acontecendo em vários locais
    queryKey: ['profile-admin'],
    queryFn: getProfileAdmin,
    // Só usa dessa forma quando o dado não é comum mudar, para não fazer requisição toda vez que perder o foco da tela
    staleTime: Infinity,
  })

  // Desloga o administrador da aplicação
  const { mutateAsync: logoutAdminFn, isPending: isLogoutAdmin } = useMutation({
    mutationFn: logoutAdmin,
    onSuccess: () => {
      // replace => força o administrador a não voltar para o página anterior
      navigate('/restrict/admin/login?logout=true', { replace: true })
    },
  })

  async function handlelogoutAdmin() {
    try {
      await logoutAdminFn()

      toast.success('Sessão encerrada com sucesso!', {
        description: 'Volte para plataforma quando quiser.',
      })
    } catch (err) {
      toast.error('Houve um erro ao se deslogar!', {
        description: 'Por favor, tente novamente.',
      })
    }
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
        <DropdownMenuLabel className="flex flex-col gap-1">
          <span className="text-sm font-semibold">
            {isLoadindProfile ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              profile?.user.name
            )}
          </span>
          <span className="font-normal text-muted-foreground">
            {isLoadindProfile ? (
              <Skeleton className="h-4 w-48" />
            ) : (
              profile?.user.email
            )}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex cursor-pointer items-center justify-center gap-2 bg-red-600 text-white focus:bg-red-700 focus:text-white"
          disabled={isLogoutAdmin}
          asChild
        >
          <button
            className="flex w-full items-center justify-center gap-2"
            onClick={handlelogoutAdmin}
          >
            <LogOut className="h-4 w-4" />
            <span className="font-semibold">Sair da conta</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
