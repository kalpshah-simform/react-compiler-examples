import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/layouts/app-layout'
import { paths } from '@/routes/paths'
import { DashboardPage } from '@/pages/dashboard-page'
import { ReactHookFormPage } from '@/pages/react-hook-form-page'
import { TanstackQueryPage } from '@/pages/tanstack-query-page'
import { TanstackTablePage } from '@/pages/tanstack-table-page'
import { ReduxToolkitPage } from '@/pages/redux-toolkit-page'
import { ShadcnUiPage } from '@/pages/shadcn-ui-page'
import { DateFnsPage } from '@/pages/date-fns-page'
import { RechartsPage } from '@/pages/recharts-page'
import { ReactCompilerLabPage } from '@/pages/react-compiler-lab-page'

export const router = createBrowserRouter([
  {
    path: paths.dashboard,
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: paths.reactHookForm, element: <ReactHookFormPage /> },
      { path: paths.tanstackQuery, element: <TanstackQueryPage /> },
      { path: paths.tanstackTable, element: <TanstackTablePage /> },
      { path: paths.reduxToolkit, element: <ReduxToolkitPage /> },
      { path: paths.shadcnUi, element: <ShadcnUiPage /> },
      { path: paths.dateFns, element: <DateFnsPage /> },
      { path: paths.recharts, element: <RechartsPage /> },
      { path: paths.reactCompilerLab, element: <ReactCompilerLabPage /> },
    ],
  },
])
