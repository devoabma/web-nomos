import { Outlet } from 'react-router-dom'

import LogoOAB from '@/assets/logo-oab.png'

export function AuthLayoutAdmin() {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center justify-between gap-3 text-lg text-foreground">
          <img src={LogoOAB} alt="OAB Maranhão" className="h-14" />
          <span className="font-semibold">Área Administrativa OAB</span>
        </div>

        <footer className="text-sm">
          &copy; {new Date().getFullYear()} - Gerência de Tecnologia da
          Informação
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
