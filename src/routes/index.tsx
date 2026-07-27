import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/layouts/app-layout'
import { paths } from '@/routes/paths'
import { DashboardPage } from '@/pages/dashboard-page'

export const router = createBrowserRouter([
  {
    path: paths.dashboard,
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: paths.reactHookForm,
        lazy: async () => {
          const { ReactHookFormPage } =
            await import('@/pages/react-hook-form-page')
          return { Component: ReactHookFormPage }
        },
      },
      {
        path: paths.tanstackQuery,
        lazy: async () => {
          const { TanstackQueryPage } =
            await import('@/pages/tanstack-query-page')
          return { Component: TanstackQueryPage }
        },
      },
      {
        path: paths.tanstackTable,
        lazy: async () => {
          const { TanstackTablePage } =
            await import('@/pages/tanstack-table-page')
          return { Component: TanstackTablePage }
        },
      },
      {
        path: paths.reduxToolkit,
        lazy: async () => {
          const { ReduxToolkitPage } =
            await import('@/pages/redux-toolkit-page')
          return { Component: ReduxToolkitPage }
        },
      },
      {
        path: paths.zustand,
        lazy: async () => {
          const { ZustandPage } = await import('@/pages/zustand-page')
          return { Component: ZustandPage }
        },
      },
      {
        path: paths.shadcnUi,
        lazy: async () => {
          const { ShadcnUiPage } = await import('@/pages/shadcn-ui-page')
          return { Component: ShadcnUiPage }
        },
      },
      {
        path: paths.recharts,
        lazy: async () => {
          const { RechartsPage } = await import('@/pages/recharts-page')
          return { Component: RechartsPage }
        },
      },
    ],
  },
])
