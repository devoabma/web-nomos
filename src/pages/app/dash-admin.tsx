import { Helmet } from 'react-helmet-async'

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
                {Array.from({ length: 10 }).map((_, i) => {
                  return <LawyersTableRow key={i} />
                })}
              </TableBody>
            </Table>
          </div>

          <LawyerPagination pageIndex={0} totalCount={105} perPage={11} />
        </div>
      </div>
    </div>
  )
}
