import { ChevronDown, LogOut } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function HeaderAccountMenu() {
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

      <DropdownMenuContent align="end" className="w-96">
        <DropdownMenuLabel className="flex flex-col gap-1.5 text-center">
          <span>DALENE FERREIRA MELO DOS SANTOS</span>
          <span className="text-sm font-normal text-muted-foreground">
            Número da OAB: <b>22158</b>
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex cursor-pointer items-center justify-center gap-2 bg-red-500 text-white focus:bg-red-600 focus:text-white">
          <LogOut className="h-4 w-4" />
          <span className="font-semibold">Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
