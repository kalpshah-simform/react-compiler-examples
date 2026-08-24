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
import { FormField } from '@/features/insurance-claim/components/form-field'
import type { InsuranceClaimFormInput } from '@/features/insurance-claim/schema'

// Discussion point:
// Without react compiler this damaged items section component is working fine. But when we enable the react compiler then it is not showing the error message for the input fields correctly when we click on add item button.
//
// Root cause: React Compiler memoizes the mapped JSX for each row keyed on
// `errors.damagedItems` by reference. React Hook Form doesn't always replace
// that array/object graph wholesale when a single nested field revalidates —
// it can mutate parts of it in place — so the compiler's reference check
// misses the update and reuses the stale (errorless) cached row instead of
// re-evaluating `errors.damagedItems?.[index]?.description?.message`.
// Plain `register()` compounds this: its `ref`/`onChange` are also memoized
// per the same cached row, so a newly appended row can end up validated
// internally by RHF while the DOM never re-syncs to show it.
//
// Switching the inputs to Controller alone isn't enough: `fieldState.error`
// lives inside Controller's own render callback, but the `error` prop we
// were still handing to `FormField` was read from the *outer* `errors`
// object, so it was still subject to the same stale-memoization problem.
// The fix is to let `Controller` render `FormField` itself (using
// `fieldState.error`, not the outer `errors` object) — Controller/
// useController keeps an independent subscription to its own field path via
// an external store, so React re-renders it on that field's own validation
// change regardless of how the parent's `errors` reference behaves.
export function DamagedItemsSection() {
  const { control } = useFormContext<InsuranceClaimFormInput>()
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
            <Controller
              control={control}
              name={`damagedItems.${index}.description`}
              render={({ field, fieldState }) => (
                <FormField
                  label="Description"
                  htmlFor={`damagedItems.${index}.description`}
                  required
                  error={fieldState.error?.message}
                >
                  <Input
                    id={`damagedItems.${index}.description`}
                    placeholder="Rear bumper damage"
                    {...field}
                  />
                </FormField>
              )}
            />

            <Controller
              control={control}
              name={`damagedItems.${index}.estimatedValue`}
              render={({ field: { value, ...field }, fieldState }) => (
                <FormField
                  label="Estimated Value ($)"
                  htmlFor={`damagedItems.${index}.estimatedValue`}
                  required
                  error={fieldState.error?.message}
                >
                  <Input
                    id={`damagedItems.${index}.estimatedValue`}
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    value={(value ?? '') as string}
                    {...field}
                  />
                </FormField>
              )}
            />

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
