import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/app/lawyers/footer'
import { Header } from '@/components/app/lawyers/header'
import { InterceptorAccessToken } from '@/components/app/lawyers/interceptor-access-token'

export function AppLayoutLawyer() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col items-center justify-center">
        <Outlet />
      </div>

      <InterceptorAccessToken />

      <Footer />
    </div>
  )
}
