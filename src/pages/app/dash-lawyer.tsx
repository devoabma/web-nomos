import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

import { getProfileLawyer } from '@/api/get-profile-lawyer'
import { AlertInfoApproved } from '@/components/app/lawyers/alert-info-approved'
import { AlertInfoPending } from '@/components/app/lawyers/alert-info-pending'
import { AlertInfoRegistered } from '@/components/app/lawyers/alert-info-registered'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatFullName } from '@/utils/format-full-name'
import { formatMaskCPF } from '@/utils/format-mask-cpf'
import { formatMaskPhone } from '@/utils/format-mask-phone'

export function DashLawyer() {
  const { data: lawyer } = useQuery({
    queryKey: ['profile-lawyer'],
    queryFn: getProfileLawyer,
  })

  if (!lawyer) {
    return
  }

  return (
    <motion.div
      className="container flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.9 }}
    >
      <Helmet title="Dashboard" />

      {lawyer.user.registered ? (
        <AlertInfoRegistered user={lawyer.user} />
      ) : lawyer.user.informations_accepted ? (
        <AlertInfoApproved user={lawyer.user} />
      ) : (
        <AlertInfoPending />
      )}

      <Card className="mx-auto w-full max-w-5xl">
        <CardHeader>
          <CardTitle>Informações do Advogado(a)</CardTitle>
          <CardDescription>
            Seus dados cadastrais no nosso sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <div className="relative">
              <Input
                id="name"
                className="disabled:bg-input"
                defaultValue={formatFullName(lawyer.user.name)}
                disabled
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <div className="relative">
                <Input
                  id="cpf"
                  className="disabled:bg-input"
                  defaultValue={formatMaskCPF(lawyer.user.cpf)}
                  disabled
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <div className="relative">
                <Input
                  id="phone"
                  className="disabled:bg-input"
                  type="tel"
                  defaultValue={formatMaskPhone(lawyer.user.telephone)}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                className="disabled:bg-input"
                defaultValue={lawyer.user.email}
                disabled
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
