import { Outlet } from 'react-router-dom'

import { HeaderAdmin } from '@/components/app/admin/header'
import { InterceptorAccessToken } from '@/components/app/admin/interceptor-access-token'

export function AppLayoutAdmin() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <HeaderAdmin />

      <div className="flex flex-1 flex-col items-center gap-4 p-8 pt-6">
        <Outlet />
      </div>

      <InterceptorAccessToken />
    </div>
  )
}
