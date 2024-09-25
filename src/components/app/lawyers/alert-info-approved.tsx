import 'dayjs/locale/pt-br'

import dayjs from 'dayjs'
import { CalendarCheck2, CheckCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface AlertInfoApprovedProps {
  user: {
    informations_accepted: string
  }
}

export function AlertInfoApproved({ user }: AlertInfoApprovedProps) {
  const formattedDateInformationAccpet = dayjs(
    user.informations_accepted,
  ).format('D [de] MMMM [de] YYYY [às] HH:mm[h]')

  return (
    <Alert
      variant="default"
      className="mx-auto my-4 max-w-5xl border-blue-300 bg-blue-50"
    >
      <CheckCircle className="h-5 w-5 text-blue-600" />
      <AlertTitle className="text-lg font-semibold text-blue-800">
        Dados de Cadastro Aprovados
      </AlertTitle>
      <AlertDescription className="mt-2 text-blue-700">
        <p className="mb-2">
          Prezado(a) advogado(a), seus dados de cadastro foram aprovados e
          confirmados por você. Agradecemos pela sua colaboração no processo de
          registro.
        </p>
        <p className="mb-4 font-semibold">
          Agora pedimos gentilmente que aguarde, pois iremos cadastrá-lo(a) e
          você será avisado(a) por aqui e por e-mail.
        </p>
        <div className="flex items-center justify-end max-sm:justify-start">
          <CalendarCheck2 className="mr-1.5 h-5 w-5 text-blue-600" />
          <div className="flex flex-col">
            <span className="ml-1 font-semibold text-blue-600">
              Data da confirmação dos dados:
            </span>
            <p className="ml-1.5 text-center text-xs font-medium text-muted-foreground">
              {formattedDateInformationAccpet}
            </p>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
}
