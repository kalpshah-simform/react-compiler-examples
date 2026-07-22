import { Plus, Trash2 } from 'lucide-react'
import { useFieldArray, useFormContext, useFormState } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/features/insurance-claim/components/form-field'
import type { InsuranceClaimFormInput } from '@/features/insurance-claim/schema'

export function WitnessesSection() {
  const { register, control } = useFormContext<InsuranceClaimFormInput>()
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
              <FormField
                label="Name"
                htmlFor={`witnesses.${index}.name`}
                required
                error={errors.witnesses?.[index]?.name?.message}
              >
                <Input
                  id={`witnesses.${index}.name`}
                  {...register(`witnesses.${index}.name`)}
                />
              </FormField>

              <FormField
                label="Phone"
                htmlFor={`witnesses.${index}.phone`}
                required
                error={errors.witnesses?.[index]?.phone?.message}
              >
                <Input
                  id={`witnesses.${index}.phone`}
                  type="tel"
                  {...register(`witnesses.${index}.phone`)}
                />
              </FormField>

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

            <FormField
              label="Statement"
              htmlFor={`witnesses.${index}.statement`}
              error={errors.witnesses?.[index]?.statement?.message}
            >
              <Textarea
                id={`witnesses.${index}.statement`}
                rows={2}
                {...register(`witnesses.${index}.statement`)}
              />
            </FormField>
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
