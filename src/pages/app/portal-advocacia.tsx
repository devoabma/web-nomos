import { motion } from 'framer-motion'
import { ExternalLink, ScreenShare } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'

export function PortalAdvocacia() {
  return (
    <motion.div
      className="mt-4 flex flex-col items-center justify-center space-y-4"
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.9 }}
    >
      <Helmet title="Portal Advocacia" />

      <div className="mb-5 flex flex-col items-center gap-2">
        <h1 className="font-calSans text-[28px] md:text-4xl lg:text-6xl">
          Novo Portal da <span className="text-primary">Advocacia</span>
        </h1>

        <span className="text-center text-[13px] font-light leading-snug md:w-[40rem] lg:w-[50rem] lg:text-base">
          Explore esse mais novo portal, lá você pode acessar suas informações,
          efetuar pagamentos, atualizar seus dados e gerenciar tudo o que
          precisa para o exercício da sua profissão de forma prática e segura.
        </span>
      </div>

      <div className="h-[1px] w-96 bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700 md:w-[45rem] lg:w-[50rem]" />

      <div className="flex flex-col items-start space-y-7 pt-5">
        <div className="flex w-[20rem] flex-col items-start justify-center gap-3 md:w-[25rem] lg:w-[30rem]">
          <label
            htmlFor="portal"
            className="inline-flex gap-2 text-left font-medium"
          >
            <ScreenShare className="h-5 w-5" />
            Novo Portal da Advocacia
          </label>

          <a
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full"
            href="https://portaladvocacia.oab.org.br/"
            id="portal"
          >
            <Button type="button" className="w-full font-bold">
              Acessar
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  )
}
