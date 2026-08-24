import { Plus, Trash2 } from 'lucide-react'
import {
  Controller,
  useFieldArray,
  useFormContext,
  useFormState,
} from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/features/insurance-claim/components/form-field'
import type { InsuranceClaimFormInput } from '@/features/insurance-claim/schema'

export function WitnessesSection() {
  const { control } = useFormContext<InsuranceClaimFormInput>()
  const { errors } = useFormState({ control })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'witnesses',
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Witnesses (Optional)</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {typeof errors.witnesses?.message === 'string' ? (
          <p className="text-xs text-destructive" role="alert">
            {errors.witnesses.message}
          </p>
        ) : null}

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid gap-4 rounded-lg border border-border p-4"
          >
            <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
              <Controller
                control={control}
                name={`witnesses.${index}.name`}
                render={({ field, fieldState }) => (
                  <FormField
                    label="Name"
                    htmlFor={`witnesses.${index}.name`}
                    required
                    error={fieldState.error?.message}
                  >
                    <Input id={`witnesses.${index}.name`} {...field} />
                  </FormField>
                )}
              />

              <Controller
                control={control}
                name={`witnesses.${index}.phone`}
                render={({ field, fieldState }) => (
                  <FormField
                    label="Phone"
                    htmlFor={`witnesses.${index}.phone`}
                    required
                    error={fieldState.error?.message}
                  >
                    <Input
                      id={`witnesses.${index}.phone`}
                      type="tel"
                      {...field}
                    />
                  </FormField>
                )}
              />

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => remove(index)}
                aria-label="Remove witness"
              >
                <Trash2 />
              </Button>
            </div>

            <Controller
              control={control}
              name={`witnesses.${index}.statement`}
              render={({ field, fieldState }) => (
                <FormField
                  label="Statement"
                  htmlFor={`witnesses.${index}.statement`}
                  error={fieldState.error?.message}
                >
                  <Textarea
                    id={`witnesses.${index}.statement`}
                    rows={2}
                    {...field}
                  />
                </FormField>
              )}
            />
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          disabled={fields.length >= 5}
          onClick={() => append({ name: '', phone: '', statement: '' })}
        >
          <Plus /> Add Witness
        </Button>
      </CardContent>
    </Card>
  )
}
