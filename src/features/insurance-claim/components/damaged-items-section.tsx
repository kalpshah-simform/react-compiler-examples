import { Plus, Trash2 } from 'lucide-react'
import { useFieldArray, useFormContext, useFormState } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FormField } from '@/features/insurance-claim/components/form-field'
import type { InsuranceClaimFormInput } from '@/features/insurance-claim/schema'

// Discussion point:
// We have problem in this component like when we click on input and move away (blur effect) then it is showing the error message for that input field for first row. But when we click on add item button then it is not showing the error message for the inputs correctly. So, i want to know about this scenario and how to fix it.
export function DamagedItemsSection() {
  const { register, control } = useFormContext<InsuranceClaimFormInput>()
  const { errors } = useFormState({ control })
  console.log('[render] DamagedItemsSection', errors)

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'damagedItems',
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Damaged or Lost Items</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {typeof errors.damagedItems?.message === 'string' ? (
          <p className="text-xs text-destructive" role="alert">
            {errors.damagedItems.message}
          </p>
        ) : null}

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid gap-4 rounded-lg border border-border p-4 sm:grid-cols-[1fr_180px_auto] sm:items-end"
          >
            <FormField
              label="Description"
              htmlFor={`damagedItems.${index}.description`}
              required
              error={errors.damagedItems?.[index]?.description?.message}
            >
              <Input
                id={`damagedItems.${index}.description`}
                placeholder="Rear bumper damage"
                {...register(`damagedItems.${index}.description`)}
              />
            </FormField>

            <FormField
              label="Estimated Value ($)"
              htmlFor={`damagedItems.${index}.estimatedValue`}
              required
              error={errors.damagedItems?.[index]?.estimatedValue?.message}
            >
              <Input
                id={`damagedItems.${index}.estimatedValue`}
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                {...register(`damagedItems.${index}.estimatedValue`)}
              />
            </FormField>

            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={fields.length === 1}
              onClick={() => remove(index)}
              aria-label="Remove item"
            >
              <Trash2 />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() => append({ description: '', estimatedValue: '' })}
        >
          <Plus /> Add Item
        </Button>
      </CardContent>
    </Card>
  )
}
