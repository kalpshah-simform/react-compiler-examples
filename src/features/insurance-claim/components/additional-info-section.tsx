import { Controller, useFormContext, useFormState } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/features/insurance-claim/components/form-field'
import type { InsuranceClaimFormInput } from '@/features/insurance-claim/schema'

export function AdditionalInfoSection() {
  const { register, control } = useFormContext<InsuranceClaimFormInput>()
  const { errors } = useFormState({ control })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <FormField
          label="Preferred Contact Method"
          htmlFor="additional.contactPreference"
          error={errors.additional?.contactPreference?.message}
        >
          <Controller
            control={control}
            name="additional.contactPreference"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex flex-row gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="email" id="contactPreference.email" />
                  <Label htmlFor="contactPreference.email">Email</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="phone" id="contactPreference.phone" />
                  <Label htmlFor="contactPreference.phone">Phone</Label>
                </div>
              </RadioGroup>
            )}
          />
        </FormField>

        <FormField
          label="Additional Notes"
          htmlFor="additional.notes"
          error={errors.additional?.notes?.message}
        >
          <Textarea
            id="additional.notes"
            rows={3}
            placeholder="Anything else the claims adjuster should know?"
            {...register('additional.notes')}
          />
        </FormField>

        <div className="flex items-start gap-2">
          <Controller
            control={control}
            name="additional.agreeToTerms"
            render={({ field }) => (
              <Checkbox
                id="additional.agreeToTerms"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mt-0.5"
              />
            )}
          />
          <div className="grid gap-1">
            <Label htmlFor="additional.agreeToTerms">
              I certify that the information provided is true and accurate to
              the best of my knowledge.
            </Label>
            {errors.additional?.agreeToTerms ? (
              <p className="text-xs text-destructive" role="alert">
                {errors.additional.agreeToTerms.message}
              </p>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
