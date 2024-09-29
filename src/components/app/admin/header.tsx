import { useQuery } from '@tanstack/react-query'
import { ClipboardList, FileDown, Loader2 } from 'lucide-react'
import { useState } from 'react'
import * as XLSX from 'xlsx'

import { getAllLawyers } from '@/api/get-all-lawyers'
import LogoOAB from '@/assets/logo-oab.png'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/utils/format-date'

import { HeaderAccountMenu } from './header-account-menu'
import { HeaderNavLink } from './header-nav-link'

export function HeaderAdmin() {
  const [isExporting, setIsExporting] = useState(false)

  const { data: result } = useQuery({
    queryKey: ['get-all-lawyers'],
    queryFn: getAllLawyers,
  })

  function handleExportToExcel() {
    if (!result || !result.lawyers) return

    setIsExporting(true)

    const dataToExport = result.lawyers.map((lawyer) => ({
      Nome: lawyer.name,
      Email: lawyer.email,
      CPF: lawyer.cpf,
      Telefone: lawyer.telephone,
      Data: lawyer.registered ? formatDate(lawyer.registered) : '',
      Status: lawyer.registered
        ? 'Advogado registrado no GERID'
        : lawyer.informations_accepted
          ? 'Dados confirmados pelo Advogado'
          : 'Dados não confirmados pelo Advogado',
    }))

    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Dados dos Advogados - GERID',
    )

    // Gera o aquivo excel com os dados
    XLSX.writeFile(workbook, 'dados_advogados_oab.xlsx')

    setIsExporting(false)
  }

  if (!result) {
    return
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <img src={LogoOAB} alt="OAB Maranhão" className="h-12" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center justify-center space-x-4 max-md:hidden lg:space-x-6">
          <HeaderNavLink to="/restrict/admin">
            <ClipboardList className="h-4 w-4" />
            Solicitações
          </HeaderNavLink>

          <Button
            variant="ghost"
            className="gap-1.5 text-muted-foreground hover:text-foreground"
            onClick={handleExportToExcel}
            disabled={isExporting || result.lawyers.length <= 0}
          >
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Exportando
              </>
            ) : (
              <>
                <FileDown className="h-4 w-4" />
                Exportar Dados
              </>
            )}
          </Button>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <HeaderAccountMenu />
        </div>
      </div>
    </div>
  )
}
