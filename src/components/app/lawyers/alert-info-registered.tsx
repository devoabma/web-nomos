import { CalendarCheck2, CheckCircle, Mail } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function AlertInfoRegistered() {
  return (
    <Alert
      variant="default"
      className="mx-auto my-4 max-w-5xl border-green-300 bg-green-50"
    >
      <CheckCircle className="h-5 w-5 text-green-600" />
      <AlertTitle className="text-lg font-semibold text-green-800">
        Cadastro no GERID Concluído
      </AlertTitle>
      <AlertDescription className="mt-2 text-green-700">
        <p className="mb-2">
          Prezado(a) advogado(a), temos o prazer de informar que seu cadastro no
          sistema GERID foi concluído com sucesso.
        </p>
        <p className="mb-4">
          Em breve, você receberá um e-mail contendo um link para acessar o
          sistema. Por favor, verifique sua caixa de entrada e, se necessário, a
          pasta de spam.
        </p>
        <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-center text-green-600">
            <Mail className="mr-2 h-5 w-5" />
            <span>Aguarde o e-mail de confirmação</span>
          </div>
          <div className="flex items-center justify-end">
            <CalendarCheck2 className="mr-1.5 h-5 w-5 text-green-600" />
            <div className="flex flex-col">
              <span className="ml-1 font-semibold text-green-600">
                Data do cadastro no sistema do GERID
              </span>
              <p className="ml-1.5 text-center text-xs font-medium text-muted-foreground">
                02 de Março de 2024 às 14:30h.
              </p>
            </div>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
}
