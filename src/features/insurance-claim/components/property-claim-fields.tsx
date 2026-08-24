import { Controller, useFormContext, useFormState } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormField } from '@/features/insurance-claim/components/form-field'
import {
  DAMAGE_TYPES,
  type InsuranceClaimFormInput,
} from '@/features/insurance-claim/schema'

const DAMAGE_TYPE_LABELS: Record<(typeof DAMAGE_TYPES)[number], string> = {
  fire: 'Fire',
  water: 'Water',
  theft: 'Theft',
  storm: 'Storm',
  vandalism: 'Vandalism',
  other: 'Other',
}

export function PropertyClaimFields() {
  const { control } = useFormContext<InsuranceClaimFormInput>()
  const { errors } = useFormState({ control })

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Street Address"
          htmlFor="claim.propertyAddress.street"
          required
          className="sm:col-span-2"
          error={errors.claim?.propertyAddress?.street?.message}
        >
          <Controller
            control={control}
            name="claim.propertyAddress.street"
            render={({ field }) => (
              <Input id="claim.propertyAddress.street" {...field} />
            )}
          />
        </FormField>

        <FormField
          label="City"
          htmlFor="claim.propertyAddress.city"
          required
          error={errors.claim?.propertyAddress?.city?.message}
        >
          <Controller
            control={control}
            name="claim.propertyAddress.city"
            render={({ field }) => (
              <Input id="claim.propertyAddress.city" {...field} />
            )}
          />
        </FormField>

        <FormField
          label="State"
          htmlFor="claim.propertyAddress.state"
          required
          error={errors.claim?.propertyAddress?.state?.message}
        >
          <Controller
            control={control}
            name="claim.propertyAddress.state"
            render={({ field }) => (
              <Input
                id="claim.propertyAddress.state"
                placeholder="CA"
                maxLength={2}
                {...field}
              />
            )}
          />
        </FormField>

        <FormField
          label="ZIP Code"
          htmlFor="claim.propertyAddress.zipCode"
          required
          error={errors.claim?.propertyAddress?.zipCode?.message}
        >
          <Controller
            control={control}
            name="claim.propertyAddress.zipCode"
            render={({ field }) => (
              <Input
                id="claim.propertyAddress.zipCode"
                placeholder="94105"
                {...field}
              />
            )}
          />
        </FormField>

        <FormField
          label="Damage Type"
          htmlFor="claim.damageType"
          required
          error={errors.claim?.damageType?.message}
        >
          <Controller
            control={control}
            name="claim.damageType"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="claim.damageType" className="w-full">
                  <SelectValue placeholder="Select a damage type" />
                </SelectTrigger>
                <SelectContent>
                  {DAMAGE_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {DAMAGE_TYPE_LABELS[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField
          label="Estimated Repair Cost"
          htmlFor="claim.estimatedRepairCost"
          required
          error={errors.claim?.estimatedRepairCost?.message}
        >
          <Controller
            control={control}
            name="claim.estimatedRepairCost"
            render={({ field }) => (
              <Input
                id="claim.estimatedRepairCost"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                placeholder="2500.00"
                {...field}
              />
            )}
          />
        </FormField>
      </div>
    </div>
  )
}
