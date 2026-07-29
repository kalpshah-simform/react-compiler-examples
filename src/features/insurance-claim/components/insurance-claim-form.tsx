import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  ClaimSubmissionError,
  submitInsuranceClaim,
  type SubmitClaimResult,
} from '@/features/insurance-claim/api'
import { AdditionalInfoSection } from '@/features/insurance-claim/components/additional-info-section'
import { ClaimDetailsSection } from '@/features/insurance-claim/components/claim-details-section'
import { DamagedItemsSection } from '@/features/insurance-claim/components/damaged-items-section'
import { PolicyholderSection } from '@/features/insurance-claim/components/policyholder-section'
import { SubmissionResult } from '@/features/insurance-claim/components/submission-result'
import { WitnessesSection } from '@/features/insurance-claim/components/witnesses-section'
import {
  insuranceClaimSchema,
  type InsuranceClaimFormInput,
  type InsuranceClaimFormValues,
} from '@/features/insurance-claim/schema'

const sampleValues: InsuranceClaimFormInput = {
  policyholder: {
    fullName: 'Jordan Avery',
    email: 'jordan.avery@example.com',
    phone: '+15551234567',
    policyNumber: 'POL-2024-9981',
    dateOfBirth: '1990-05-14',
  },
  claim: {
    claimType: 'auto',
    incidentDate: '2026-07-01',
    incidentDescription:
      'Rear-ended at a stop light while waiting to turn; bumper and trunk sustained damage.',
    policeReportFiled: true,
    policeReportNumber: 'PR-445566',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry',
    vehicleYear: '2019',
    licensePlate: 'ABC-1234',
    otherPartyInvolved: true,
    otherParty: {
      name: 'Sam Rivera',
      phone: '+15559876543',
      insuranceCompany: 'Acme Mutual Insurance',
    },
    propertyAddress: { street: '', city: '', state: '', zipCode: '' },
    damageType: '',
    estimatedRepairCost: '',
  },
  damagedItems: [{ description: 'Rear bumper', estimatedValue: '850' }],
  witnesses: [
    { name: 'Taylor Chen', phone: '+15552223333', statement: 'Saw the other car fail to stop in time.' },
  ],
  additional: {
    contactPreference: 'email',
    notes: 'Prefer to be contacted in the morning.',
    agreeToTerms: true,
  },
}

const defaultValues: InsuranceClaimFormInput = {
  policyholder: {
    fullName: '',
    email: '',
    phone: '',
    policyNumber: '',
    dateOfBirth: '',
  },
  claim: {
    claimType: 'auto',
    incidentDate: '',
    incidentDescription: '',
    policeReportFiled: false,
    policeReportNumber: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    licensePlate: '',
    otherPartyInvolved: false,
    otherParty: { name: '', phone: '', insuranceCompany: '' },
    propertyAddress: { street: '', city: '', state: '', zipCode: '' },
    damageType: '',
    estimatedRepairCost: '',
  },
  damagedItems: [{ description: '', estimatedValue: '' }],
  witnesses: [],
  additional: {
    contactPreference: 'email',
    notes: '',
    agreeToTerms: false,
  },
}

export function InsuranceClaimForm() {
  const [result, setResult] = useState<SubmitClaimResult | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  // const [counter, setCounter] = useState(0)

  const form = useForm<
    InsuranceClaimFormInput,
    unknown,
    InsuranceClaimFormValues
  >({
    resolver: zodResolver(insuranceClaimSchema),
    defaultValues,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  async function onSubmit(values: InsuranceClaimFormValues) {
    setSubmitError(null)
    try {
      const response = await submitInsuranceClaim(values)
      setResult(response)
    } catch (error) {
      setSubmitError(
        error instanceof ClaimSubmissionError
          ? error.message
          : 'Something went wrong while submitting your claim. Please try again.',
      )
    }
  }

  function handleSubmitAnother() {
    setResult(null)
    setSubmitError(null)
    form.reset(defaultValues)
  }

  if (result) {
    return (
      <SubmissionResult result={result} onSubmitAnother={handleSubmitAnother} />
    )
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={(event) => {
          void form.handleSubmit(onSubmit)(event)
        }}
        className="grid gap-6"
        noValidate
      >
        <PolicyholderSection />
        <ClaimDetailsSection />
        <DamagedItemsSection />
        <WitnessesSection />
        <AdditionalInfoSection />

        {submitError ? (
          <p
            className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
            role="alert"
          >
            {submitError}
          </p>
        ) : null}

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Submitting...' : 'Submit Claim'}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={form.formState.isSubmitting}
            onClick={() => {
              // discussion point:
              // Here form.reset is not working as expected, it is not resetting the form values to defaultValues.
              // Anyone knows about this scenario and how to fix it?
              // setCounter((prev) => prev + 1)
              form.reset(defaultValues)
            }}
          >
            Reset
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={form.formState.isSubmitting}
            onClick={() => {
              form.reset(sampleValues)
            }}
          >
            Prefill Sample Data
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
