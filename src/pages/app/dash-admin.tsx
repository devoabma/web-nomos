import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { fetchLawyers } from '@/api/fetch-lawyers'
import { LawyerPagination } from '@/components/app/admin/lawyers-pagination'
import { LawyersTableFilters } from '@/components/app/admin/lawyers-table-filters'
import { LawyersTableRow } from '@/components/app/admin/lawyers-table-row'
import { MetricsLawyers } from '@/components/app/admin/metrics-lawyers'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function DashAdmin() {
  const [searcParams, setSearchParams] = useSearchParams()

  const name = searcParams.get('name')
  const cpf = searcParams.get('cpf')
  const email = searcParams.get('email')

  const pageIndex = z.coerce
    .number()
    // .transform((page) => page - 1)
    .parse(searcParams.get('page') ?? '1')

  const { data: result } = useQuery({
    // Sempre que tivermos uma função na requisicão, precisamos adicicionar o parâmetro que vem na queryKey
    queryKey: ['lawyers', pageIndex, name, cpf, email],
    queryFn: () =>
      fetchLawyers({
        pageIndex,
        name,
        cpf,
        email,
      }),
  })

  const totalCount =
    result?.lawyers.filter((lawyer) => lawyer.informations_accepted).length || 0

  function handlePaginate(pageIndex: number) {
    setSearchParams((stateUrl) => {
      stateUrl.set('page', pageIndex.toString())

      return stateUrl
    })
  }

  return (
    <div className="container p-4">
      <Helmet title="Solicitações" />

      <MetricsLawyers />

      <div className="mt-6 flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Solicitações</h1>

        <div className="space-y-2.5">
          <LawyersTableFilters />

          <div className="overflow-x-auto rounded-md border sm:overflow-x-visible">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[54px] font-medium"></TableHead>
                  <TableHead className="w-[100px] font-medium">
                    Status
                  </TableHead>
                  <TableHead className="font-medium">Advogado(a)</TableHead>
                  <TableHead className="w-[200px] font-medium">CPF</TableHead>
                  <TableHead className="w-[284px] font-medium">
                    E-mail
                  </TableHead>
                  <TableHead className="w-[200px] font-medium">
                    Telefone
                  </TableHead>
                  <TableHead className="w-[164px] font-medium"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {/* Envia somente os advogados que confirmaram seus dados */}
                {result &&
                  result.lawyers.map((lawyer) => {
                    return (
                      lawyer.informations_accepted && (
                        <LawyersTableRow key={lawyer.id} lawyers={lawyer} />
                      )
                    )
                  })}
              </TableBody>
            </Table>
          </div>

          {result && (
            <LawyerPagination
              pageIndex={pageIndex}
              totalCount={totalCount}
              perPage={10}
              onPageChange={handlePaginate}
            />
          )}
        </div>
      </div>
    </div>
  )
}
