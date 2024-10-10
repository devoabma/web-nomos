import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'

import LogoOAB from '@/assets/logo-oab.png'

export function AuthLayoutLawyer() {
  return (
    <div className="grid min-h-screen grid-cols-1 antialiased md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="order-2 flex h-full flex-col justify-between border-t border-foreground/5 bg-muted p-10 text-muted-foreground md:order-1 md:border-r"
      >
        <div className="flex flex-col items-center space-y-4 text-lg text-foreground md:flex-row md:justify-between md:space-y-0">
          <motion.img
            src={LogoOAB}
            alt="OAB Maranhão"
            className="h-14"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          />
          <motion.span
            className="font-calSans text-base font-semibold md:text-lg lg:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            INSS Digital OAB
          </motion.span>
        </div>

        <motion.footer
          className="flex items-center justify-center text-sm md:justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a
            href="/restrict/admin/login"
            className="transition-colors duration-200 hover:text-foreground"
          >
            &copy; {new Date().getFullYear()} - Gerência de Tecnologia da
            Informação
          </a>
        </motion.footer>
      </motion.div>

      <div className="relative order-1 flex flex-col items-center justify-center md:order-2">
        <Outlet />
      </div>
    </div>
  )
}
