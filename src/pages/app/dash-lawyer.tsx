import { Helmet } from 'react-helmet-async'

import { AlertInfoPending } from '@/components/app/lawyers/alert-info-pending'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function DashLawyer() {
  return (
    <div className="container p-4">
      <Helmet title="Dashboard" />

      <AlertInfoPending />
      {/* <AlertInfoApproved /> */}
      {/* <AlertInfoRegistered /> */}

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
                defaultValue="DALENE FERREIRA MELO DOS SANTOS"
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
                  defaultValue="123.456.789-00"
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
                  defaultValue="(98) 98329-1170"
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
                defaultValue="dalenefmeloadv@gmail.com"
                disabled
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
