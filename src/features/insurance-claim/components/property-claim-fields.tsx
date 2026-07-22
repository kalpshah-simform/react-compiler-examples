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
  const { register, control } = useFormContext<InsuranceClaimFormInput>()
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
          <Input
            id="claim.propertyAddress.street"
            {...register('claim.propertyAddress.street')}
          />
        </FormField>

        <FormField
          label="City"
          htmlFor="claim.propertyAddress.city"
          required
          error={errors.claim?.propertyAddress?.city?.message}
        >
          <Input
            id="claim.propertyAddress.city"
            {...register('claim.propertyAddress.city')}
          />
        </FormField>

        <FormField
          label="State"
          htmlFor="claim.propertyAddress.state"
          required
          error={errors.claim?.propertyAddress?.state?.message}
        >
          <Input
            id="claim.propertyAddress.state"
            placeholder="CA"
            maxLength={2}
            {...register('claim.propertyAddress.state')}
          />
        </FormField>

        <FormField
          label="ZIP Code"
          htmlFor="claim.propertyAddress.zipCode"
          required
          error={errors.claim?.propertyAddress?.zipCode?.message}
        >
          <Input
            id="claim.propertyAddress.zipCode"
            placeholder="94105"
            {...register('claim.propertyAddress.zipCode')}
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
          <Input
            id="claim.estimatedRepairCost"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            placeholder="2500.00"
            {...register('claim.estimatedRepairCost')}
          />
        </FormField>
      </div>
    </div>
  )
}
