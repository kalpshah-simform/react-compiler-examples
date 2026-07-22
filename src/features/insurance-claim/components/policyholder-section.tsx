import { useFormContext, useFormState } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FormField } from '@/features/insurance-claim/components/form-field'
import type { InsuranceClaimFormInput } from '@/features/insurance-claim/schema'

export function PolicyholderSection() {
  const { register, control } = useFormContext<InsuranceClaimFormInput>()
  const { errors } = useFormState({ control })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Policyholder Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Full Name"
          htmlFor="policyholder.fullName"
          required
          error={errors.policyholder?.fullName?.message}
        >
          <Input
            id="policyholder.fullName"
            autoComplete="name"
            {...register('policyholder.fullName')}
          />
        </FormField>

        <FormField
          label="Email"
          htmlFor="policyholder.email"
          required
          error={errors.policyholder?.email?.message}
        >
          <Input
            id="policyholder.email"
            type="email"
            autoComplete="email"
            {...register('policyholder.email')}
          />
        </FormField>

        <FormField
          label="Phone"
          htmlFor="policyholder.phone"
          required
          error={errors.policyholder?.phone?.message}
        >
          <Input
            id="policyholder.phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 555 123 4567"
            {...register('policyholder.phone')}
          />
        </FormField>

        <FormField
          label="Policy Number"
          htmlFor="policyholder.policyNumber"
          required
          error={errors.policyholder?.policyNumber?.message}
        >
          <Input
            id="policyholder.policyNumber"
            placeholder="POL-2024-000123"
            {...register('policyholder.policyNumber')}
          />
        </FormField>

        <FormField
          label="Date of Birth"
          htmlFor="policyholder.dateOfBirth"
          required
          error={errors.policyholder?.dateOfBirth?.message}
        >
          <Input
            id="policyholder.dateOfBirth"
            type="date"
            {...register('policyholder.dateOfBirth')}
          />
        </FormField>
      </CardContent>
    </Card>
  )
}
