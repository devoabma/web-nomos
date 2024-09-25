import { createBrowserRouter } from 'react-router-dom'

import { AppLayoutAdmin } from './pages/_layouts/admin/app'
import { AuthLayoutAdmin } from './pages/_layouts/admin/auth'
import { AppLayoutLawyer } from './pages/_layouts/lawyers/app'
import { AuthLayoutLawyer } from './pages/_layouts/lawyers/auth'
import { DashAdmin } from './pages/app/dash-admin'
import { DashLawyer } from './pages/app/dash-lawyer'
import { PortalAdvocacia } from './pages/app/portal-advocacia'
import { LoginAdmin } from './pages/auth/login-admin'
import { LoginLawyer } from './pages/auth/login-lawyer'
import { RegisterAdmin } from './pages/auth/register-admin'
import { RegisterLawyer } from './pages/auth/register-lawyer'
import { NotFoundAdmin } from './pages/not-found/404-admin'
import { NotFoundLawyer } from './pages/not-found/404-lawyer'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayoutLawyer />,
    errorElement: <NotFoundLawyer />,
    children: [
      { path: '/', element: <DashLawyer /> },
      { path: '/portal-advocacia', element: <PortalAdvocacia /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayoutLawyer />,
    children: [
      { path: '/login', element: <LoginLawyer /> },
      { path: '/register', element: <RegisterLawyer /> },
    ],
  },
  {
    path: '/restrict/admin',
    element: <AppLayoutAdmin />,
    errorElement: <NotFoundAdmin />,
    children: [
      { path: '/restrict/admin', element: <DashAdmin /> },
      { path: '*', element: <NotFoundAdmin /> },
    ],
  },
  {
    path: '/restrict/admin',
    element: <AuthLayoutAdmin />,
    children: [
      { path: '/restrict/admin/login', element: <LoginAdmin /> },
      { path: '/restrict/admin/register', element: <RegisterAdmin /> },
    ],
  },
])
