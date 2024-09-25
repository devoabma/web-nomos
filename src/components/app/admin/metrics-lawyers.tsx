import { useQuery } from '@tanstack/react-query'
import { UserCheck, UserCog, Users } from 'lucide-react'

import { approvedMetrics } from '@/api/approved-metrics'
import { lawyersMetrics } from '@/api/lawyers-metrics'
import { registeredMetrics } from '@/api/registered-metrics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MetricsLawyers() {
  const { data: countLawyers } = useQuery({
    queryKey: ['lawyers-metrics'],
    queryFn: lawyersMetrics,
  })

  const { data: countApproved } = useQuery({
    queryKey: ['approved-metrics'],
    queryFn: approvedMetrics,
  })

  const { data: countRegistered } = useQuery({
    queryKey: ['registered-metrics'],
    queryFn: registeredMetrics,
  })

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-amber-800">
            Total de Advogados(a) Cadastrados
          </CardTitle>
          <Users className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-900">
            {countLawyers}
          </div>
          <p className="text-xs text-amber-700">
            +20% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-800">
            Advogados(a) que aprovaram seus dados
          </CardTitle>
          <UserCheck className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">
            {countApproved}
          </div>
          <p className="text-xs text-blue-700">80% do total de cadastrados</p>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-800">
            Advogados(a) registrados no GERID
          </CardTitle>
          <UserCog className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">
            {countRegistered}
          </div>
          <p className="text-xs text-green-700">61% do total de cadastrados</p>
        </CardContent>
      </Card>
    </div>
  )
}
