import { Database, MonitorCheck } from 'lucide-react'

import LogoOAB from '@/assets/logo-oab.png'
import { Separator } from '@/components/ui/separator'

import { HeaderAccountMenu } from './header-account-menu'
import { HeaderNavLink } from './header-nav-link'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <img src={LogoOAB} alt="OAB Maranhão" className="h-12" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center justify-center space-x-4 max-md:hidden lg:space-x-6">
          <HeaderNavLink to="/dashboard">
            <Database className="h-4 w-4" />
            Meus dados
          </HeaderNavLink>
          <HeaderNavLink to="/portal-advocacia">
            <MonitorCheck className="h-4 w-4" />
            Portal da Advocacia
          </HeaderNavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <HeaderAccountMenu />
        </div>
      </div>
    </div>
  )
}
