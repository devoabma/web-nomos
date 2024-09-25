import { WhatsApp } from '@mui/icons-material'
import { AlertTriangle, CheckCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { ValidateDataLawyer } from './validate-data'

export function AlertInfoPending() {
  return (
    <Alert
      variant="default"
      className="mx-auto my-4 max-w-5xl border-amber-300 bg-amber-50"
    >
      <AlertTriangle className="h-5 w-5 text-amber-600" />
      <AlertTitle className="text-lg font-semibold text-amber-800">
        Confirmação de Dados Pendente
      </AlertTitle>
      <AlertDescription className="mt-2 text-amber-700">
        <p className="mb-2">
          Prezado(a) advogado(a), seus dados cadastrais vindos da nossa base de
          dados ainda não foram confirmados. É necessário que você verifique e
          confirme suas informações para completar o processo de solicitação.
        </p>
        <p className="mb-4 font-semibold">
          Caso julgue que alguma informação não está correta, por favor,
          dirija-se ao setor de cadastro para as devidas correções.
        </p>
        <div className="flex flex-col space-y-3 md:flex-row md:justify-end md:space-x-3 md:space-y-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className="w-full bg-amber-600 text-white hover:bg-amber-700 md:w-auto"
              >
                <CheckCircle className="mr-1.5 h-5 w-5 text-white" />
                Confirmar Dados
              </Button>
            </DialogTrigger>

            <ValidateDataLawyer />
          </Dialog>

          <Button
            variant="outline"
            className="w-full border-amber-600 text-amber-600 hover:bg-amber-100 hover:text-amber-700 md:w-auto"
            asChild
          >
            <a
              target="_blank"
              href="https://wa.me/5598991402621?text=Ol%C3%A1%2C%20sou%20Advogado(a)%20e%20vim%20pela%20plataforma%20do%20INSS%20Digital%20OAB%20e%20constatei%20que%20meus%20dados%20est%C3%A3o%20errados%20e%20gostaria%20de%20atualizar.%20Como%20proceder%3F"
              rel="noreferrer"
            >
              <WhatsApp className="mr-1.5" />
              Setor de Cadastro
            </a>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
