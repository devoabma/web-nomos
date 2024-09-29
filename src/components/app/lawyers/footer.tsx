import { Facebook, Instagram, X, YouTube } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { Database, MonitorCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

import LogoOAB from '@/assets/logo-oab.png'

import { FooterLinkDigital } from './footer-link-digital'
import { FooterLinkMenu } from './footer-link-menu'

export function Footer() {
  return (
    <div className="mt-4 flex flex-col items-center justify-center overflow-x-hidden border-t">
      <div className="container flex h-32 items-center justify-between gap-2 overflow-hidden">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.9 }}
        >
          <Link to="/">
            <div className="flex items-center justify-center">
              <img src={LogoOAB} className="h-12" alt="OAB Maranhão" />
            </div>
          </Link>

          <div className="flex items-center justify-center gap-2.5">
            <FooterLinkDigital
              link="https://www.instagram.com/oabma/"
              icon={Instagram}
            />
            <FooterLinkDigital link="https://twitter.com/oab_ma" icon={X} />
            <FooterLinkDigital
              link="https://www.youtube.com/@oabma"
              icon={YouTube}
            />
            <FooterLinkDigital
              link="https://www.facebook.com/OABMA/?locale=pt_BR"
              icon={Facebook}
            />
          </div>
        </motion.div>

        <motion.ul
          className="space-y-3 text-sm"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.9 }}
        >
          <FooterLinkMenu link="/dashboard" icon={Database}>
            Meus Dados
          </FooterLinkMenu>
          <FooterLinkMenu link="/portal-advocacia" icon={MonitorCheck}>
            Portal Advocacia
          </FooterLinkMenu>
        </motion.ul>
      </div>

      <div className="h-[1px] w-96 bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700 md:w-[45rem] lg:w-[60rem]" />

      <div className="container flex h-24 flex-col items-center justify-center gap-2 font-medium">
        <span className="flex items-center justify-center gap-1 text-muted-foreground">
          &copy; {new Date().getFullYear()} - Gerência de Tecnologia da
          Informação
        </span>
      </div>
    </div>
  )
}
