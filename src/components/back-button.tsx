import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { paths } from '@/routes/paths'

export function BackButton() {
  return (
    <Button variant="outline" size="sm" asChild>
      <Link to={paths.dashboard}>← Back to Dashboard</Link>
    </Button>
  )
}
