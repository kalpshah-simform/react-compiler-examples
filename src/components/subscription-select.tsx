import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SubscriptionSelectProps<T extends string> {
  value: T
  options: readonly T[]
  labels: Record<T, string>
  onChange: (value: T) => void
}

export function SubscriptionSelect<T extends string>({
  value,
  options,
  labels,
  onChange,
}: SubscriptionSelectProps<T>) {
  return (
    <Select value={value} onValueChange={(next) => onChange(next as T)}>
      <SelectTrigger size="sm" className="w-44">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {labels[option]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
