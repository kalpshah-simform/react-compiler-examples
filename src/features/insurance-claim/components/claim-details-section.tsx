import {
  Controller,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { AutoClaimFields } from '@/features/insurance-claim/components/auto-claim-fields'
import { FormField } from '@/features/insurance-claim/components/form-field'
import { PropertyClaimFields } from '@/features/insurance-claim/components/property-claim-fields'
import type { InsuranceClaimFormInput } from '@/features/insurance-claim/schema'

const CLAIM_TYPE_LABELS = {
  auto: 'Auto',
  property: 'Property',
} as const

export function ClaimDetailsSection() {
  // Discussion point:
  // Previously, we have used this code like destructuring the `useFormContext` return value to get `register`, `control`, and `errors` like this:
  // const {
  //   register,
  //   control,
  //   formState: { errors },
  // } = useFormContext<InsuranceClaimFormInput>()

  // With React Compiler enabled, destructuring `formState.errors` directly from
  // `useFormContext` does not trigger a rerender when `errors` changes, because RHF's
  // formState Proxy needs to be read on every render to keep its subscription alive,
  // and the compiler can skip re-executing this component when it memoizes it.
  // `useFormState` uses an external store subscription instead, which stays compatible
  // with the compiler's memoization. reference: https://react-hook-form.com/docs/useformstate

  // Second discussion point:
  // Even with `useFormState`, `form.reset()` still failed to clear the plain
  // `register()`-bound inputs below. React Compiler memoizes the call to
  // `register(name)` itself, keyed on the (referentially stable) `register`
  // function, so it never re-invokes it and reuses the same cached `ref`
  // callback across renders. `register()` is not a pure call though: `reset()`
  // relies on a *fresh* `ref` callback being handed to React so it re-syncs the
  // uncontrolled input's DOM value from the new form state. Since the compiler
  // treats it as memoizable, that resync never happens. Controller/useController
  // fields aren't affected, since they read `field.value` from a normal render
  // value rather than an uncontrolled DOM ref, so we use Controller here too.
  const { control } = useFormContext<InsuranceClaimFormInput>()
  const { errors } = useFormState({ control })

  console.log('form state claim details section', errors)
  const claimType = useWatch({ control, name: 'claim.claimType' })
  const policeReportFiled = useWatch({
    control,
    name: 'claim.policeReportFiled',
  })


  return (
    <Card>
      <CardHeader>
        <CardTitle>Claim Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Claim Type"
            htmlFor="claim.claimType"
            required
            error={errors.claim?.claimType?.message}
          >
            <Controller
              control={control}
              name="claim.claimType"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="claim.claimType" className="w-full">
                    <SelectValue placeholder="Select a claim type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CLAIM_TYPE_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          <FormField
            label="Incident Date"
            htmlFor="claim.incidentDate"
            required
            error={errors.claim?.incidentDate?.message}
          >
            <Controller
              control={control}
              name="claim.incidentDate"
              render={({ field }) => (
                <Input id="claim.incidentDate" type="date" {...field} />
              )}
            />
          </FormField>
        </div>

        <FormField
          label="Incident Description"
          htmlFor="claim.incidentDescription"
          required
          description="Describe what happened in at least 20 characters."
          error={errors.claim?.incidentDescription?.message}
        >
          <Controller
            control={control}
            name="claim.incidentDescription"
            render={({ field }) => (
              <Textarea id="claim.incidentDescription" rows={4} {...field} />
            )}
          />
        </FormField>

        <div className="flex items-center gap-2">
          <Controller
            control={control}
            name="claim.policeReportFiled"
            render={({ field }) => (
              <Checkbox
                id="claim.policeReportFiled"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="claim.policeReportFiled">
            A police report was filed
          </Label>
        </div>

        {policeReportFiled ? (
          <FormField
            label="Police Report Number"
            htmlFor="claim.policeReportNumber"
            required
            className="sm:max-w-xs"
            error={errors.claim?.policeReportNumber?.message}
          >
            <Controller
              control={control}
              name="claim.policeReportNumber"
              render={({ field }) => (
                <Input id="claim.policeReportNumber" {...field} />
              )}
            />
          </FormField>
        ) : null}

        {claimType ? (
          <>
            <Separator />
            {claimType === 'auto' ? (
              <AutoClaimFields />
            ) : (
              <PropertyClaimFields />
            )}
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}
