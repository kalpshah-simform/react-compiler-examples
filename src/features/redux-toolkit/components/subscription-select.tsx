import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SUBSCRIPTION_OPTIONS, type SubscriptionKey } from '@/features/redux-toolkit/types'

const SUBSCRIPTION_LABELS: Record<SubscriptionKey, string> = {
  none: 'None (props only)',
  counter: 'Counter',
  user: 'User',
  theme: 'Theme',
  notifications: 'Notifications',
}

interface SubscriptionSelectProps {
  value: SubscriptionKey
  onChange: (value: SubscriptionKey) => void
}

export function SubscriptionSelect({
  value,
  onChange,
}: SubscriptionSelectProps) {
  return (
    <Select value={value} onValueChange={(next) => onChange(next as SubscriptionKey)}>
      <SelectTrigger size="sm" className="w-44">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SUBSCRIPTION_OPTIONS.map((option) => (
          <SelectItem key={option} value={option}>
            {SUBSCRIPTION_LABELS[option]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
