import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">
              Total de Advogados(a) Cadastrados
            </CardTitle>
            <Users className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">
              {String(countLawyers).padStart(2, '0')}
            </div>
            <p className="mt-2 text-xs text-amber-600">
              Crescimento constante na base de advogados cadastrados.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">
              Advogados(a) que confirmaram seus dados
            </CardTitle>
            <UserCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {String(countApproved).padStart(2, '0')}
            </div>
            <p className="mt-2 text-xs text-blue-600">
              {((countApproved / countLawyers) * 100).toFixed(1)}% do total de
              confirmações
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100 shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">
              Advogados(a) registrados no GERID
            </CardTitle>
            <UserCog className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {String(countRegistered).padStart(2, '0')}
            </div>
            <p className="mt-2 text-xs text-green-600">
              {((countRegistered / countLawyers) * 100).toFixed(1)}% de taxa de
              registro no GERID
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
