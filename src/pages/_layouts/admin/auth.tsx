import { Outlet } from 'react-router-dom'

import LogoOAB from '@/assets/logo-oab.png'

export function AuthLayoutAdmin() {
  return (
    <div className="grid min-h-screen grid-cols-1 antialiased md:grid-cols-2">
      <div className="order-2 flex h-full flex-col justify-between border-t border-foreground/5 bg-muted p-10 text-muted-foreground md:order-1 md:border-r">
        <div className="flex flex-col items-center space-y-4 text-lg text-foreground md:flex-row md:justify-between md:space-y-0">
          <img src={LogoOAB} alt="OAB Maranhão" className="h-14" />
          <span className="font-calSans text-lg font-semibold md:text-xl lg:text-3xl">
            Área Administrativa OAB
          </span>
        </div>

        <footer className="flex items-center justify-center text-sm md:justify-start">
          <a
            href="/"
            className="transition-colors duration-200 hover:text-foreground"
          >
            &copy; {new Date().getFullYear()} - Gerência de Tecnologia da
            Informação
          </a>
        </footer>
      </div>

      <div className="relative order-1 flex flex-col items-center justify-center md:order-2">
        <Outlet />
      </div>
    </div>
  )
}
