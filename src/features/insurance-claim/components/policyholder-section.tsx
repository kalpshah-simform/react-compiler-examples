import { Controller, useFormContext, useFormState } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FormField } from '@/features/insurance-claim/components/form-field'
import type { InsuranceClaimFormInput } from '@/features/insurance-claim/schema'

export function PolicyholderSection() {
  const { control } = useFormContext<InsuranceClaimFormInput>()
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
          <Controller
            control={control}
            name="policyholder.fullName"
            render={({ field }) => (
              <Input
                id="policyholder.fullName"
                autoComplete="name"
                {...field}
              />
            )}
          />
        </FormField>

        <FormField
          label="Email"
          htmlFor="policyholder.email"
          required
          error={errors.policyholder?.email?.message}
        >
          <Controller
            control={control}
            name="policyholder.email"
            render={({ field }) => (
              <Input
                id="policyholder.email"
                type="email"
                autoComplete="email"
                {...field}
              />
            )}
          />
        </FormField>

        <FormField
          label="Phone"
          htmlFor="policyholder.phone"
          required
          error={errors.policyholder?.phone?.message}
        >
          <Controller
            control={control}
            name="policyholder.phone"
            render={({ field }) => (
              <Input
                id="policyholder.phone"
                type="tel"
                autoComplete="tel"
                placeholder="+1 555 123 4567"
                {...field}
              />
            )}
          />
        </FormField>

        <FormField
          label="Policy Number"
          htmlFor="policyholder.policyNumber"
          required
          error={errors.policyholder?.policyNumber?.message}
        >
          <Controller
            control={control}
            name="policyholder.policyNumber"
            render={({ field }) => (
              <Input
                id="policyholder.policyNumber"
                placeholder="POL-2024-000123"
                {...field}
              />
            )}
          />
        </FormField>

        <FormField
          label="Date of Birth"
          htmlFor="policyholder.dateOfBirth"
          required
          error={errors.policyholder?.dateOfBirth?.message}
        >
          <Controller
            control={control}
            name="policyholder.dateOfBirth"
            render={({ field }) => (
              <Input id="policyholder.dateOfBirth" type="date" {...field} />
            )}
          />
        </FormField>
      </CardContent>
    </Card>
  )
}
