import { NavLink } from 'react-router-dom'
import { paths } from '@/routes/paths'

const navItems = [
  { to: paths.reactHookForm, label: 'React Hook Form + Zod' },
  { to: paths.tanstackQuery, label: 'TanStack Query' },
  { to: paths.tanstackTable, label: 'TanStack Table' },
  { to: paths.reduxToolkit, label: 'Redux Toolkit' },
  { to: paths.shadcnUi, label: 'Shadcn UI / Radix UI' },
  { to: paths.dateFns, label: 'date-fns' },
  { to: paths.recharts, label: 'Recharts' },
  { to: paths.reactCompilerLab, label: 'React Compiler Lab' },
]

export function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold text-foreground">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="rounded-lg border border-border bg-card p-4 text-sm font-medium text-card-foreground shadow-sm transition-colors hover:bg-muted"
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  )
}
