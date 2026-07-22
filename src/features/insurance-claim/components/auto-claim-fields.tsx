import {
  Controller,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormField } from '@/features/insurance-claim/components/form-field'
import type { InsuranceClaimFormInput } from '@/features/insurance-claim/schema'

export function AutoClaimFields() {
  const { register, control } = useFormContext<InsuranceClaimFormInput>()
  const { errors } = useFormState({ control })

  const otherPartyInvolved = useWatch({
    control,
    name: 'claim.otherPartyInvolved',
  })

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Vehicle Make"
          htmlFor="claim.vehicleMake"
          required
          error={errors.claim?.vehicleMake?.message}
        >
          <Input
            id="claim.vehicleMake"
            placeholder="Toyota"
            {...register('claim.vehicleMake')}
          />
        </FormField>

        <FormField
          label="Vehicle Model"
          htmlFor="claim.vehicleModel"
          required
          error={errors.claim?.vehicleModel?.message}
        >
          <Input
            id="claim.vehicleModel"
            placeholder="Camry"
            {...register('claim.vehicleModel')}
          />
        </FormField>

        <FormField
          label="Vehicle Year"
          htmlFor="claim.vehicleYear"
          required
          error={errors.claim?.vehicleYear?.message}
        >
          <Input
            id="claim.vehicleYear"
            type="number"
            inputMode="numeric"
            placeholder="2021"
            {...register('claim.vehicleYear')}
          />
        </FormField>

        <FormField
          label="License Plate"
          htmlFor="claim.licensePlate"
          required
          error={errors.claim?.licensePlate?.message}
        >
          <Input id="claim.licensePlate" {...register('claim.licensePlate')} />
        </FormField>
      </div>

      <div className="flex items-center gap-2">
        <Controller
          control={control}
          name="claim.otherPartyInvolved"
          render={({ field }) => (
            <Checkbox
              id="claim.otherPartyInvolved"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="claim.otherPartyInvolved">
          Another party was involved in this incident
        </Label>
      </div>

      {otherPartyInvolved ? (
        <div className="grid gap-4 rounded-lg border border-border p-4 sm:grid-cols-3">
          <FormField
            label="Other Party's Name"
            htmlFor="claim.otherParty.name"
            required
            error={errors.claim?.otherParty?.name?.message}
          >
            <Input
              id="claim.otherParty.name"
              {...register('claim.otherParty.name')}
            />
          </FormField>

          <FormField
            label="Other Party's Phone"
            htmlFor="claim.otherParty.phone"
            required
            error={errors.claim?.otherParty?.phone?.message}
          >
            <Input
              id="claim.otherParty.phone"
              type="tel"
              {...register('claim.otherParty.phone')}
            />
          </FormField>

          <FormField
            label="Other Party's Insurance Company"
            htmlFor="claim.otherParty.insuranceCompany"
            required
            error={errors.claim?.otherParty?.insuranceCompany?.message}
          >
            <Input
              id="claim.otherParty.insuranceCompany"
              {...register('claim.otherParty.insuranceCompany')}
            />
          </FormField>
        </div>
      ) : null}
    </div>
  )
}
