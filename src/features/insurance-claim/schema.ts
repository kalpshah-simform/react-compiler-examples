import { z } from 'zod'

export const CLAIM_TYPES = ['auto', 'property'] as const
export type ClaimType = (typeof CLAIM_TYPES)[number]

export const DAMAGE_TYPES = [
  'fire',
  'water',
  'theft',
  'storm',
  'vandalism',
  'other',
] as const
export type DamageType = (typeof DAMAGE_TYPES)[number]

export const CONTACT_PREFERENCES = ['email', 'phone'] as const
export type ContactPreference = (typeof CONTACT_PREFERENCES)[number]

const CURRENT_YEAR = new Date().getFullYear()

const PHONE_REGEX = /^\+?[0-9]{7,15}$/
const POLICY_NUMBER_REGEX = /^[A-Za-z0-9-]{6,20}$/
const ZIP_REGEX = /^\d{5}(-\d{4})?$/

const phoneField = (message = 'Enter a valid phone number (7-15 digits)') =>
  z.string().trim().regex(PHONE_REGEX, message)

function isNotFutureDate(value: string) {
  if (!value) return false
  return new Date(value).getTime() <= Date.now()
}

function isAtLeast18YearsOld(value: string) {
  if (!value) return false
  const cutoff = new Date()
  cutoff.setFullYear(cutoff.getFullYear() - 18)
  return new Date(value).getTime() <= cutoff.getTime()
}

function isNonEmpty(value: string) {
  return value.trim().length > 0
}

export const policyholderSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter the policyholder's full name")
    .max(100, 'Keep the name under 100 characters'),
  email: z.email('Enter a valid email address'),
  phone: phoneField(),
  policyNumber: z
    .string()
    .trim()
    .regex(
      POLICY_NUMBER_REGEX,
      'Policy number must be 6-20 letters, numbers, or dashes',
    ),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine(isAtLeast18YearsOld, 'Policyholder must be at least 18 years old'),
})

// All fields below are declared as plain, always-present strings/booleans
// (never `.optional()`) because native inputs always carry a string value
// (`''` when empty). Fields that only apply to one claim type, or only
// become required once another field is set, are enforced conditionally in
// `insuranceClaimSchema`'s `superRefine` below instead of at the field level.
const claimSchema = z.object({
  claimType: z.enum(CLAIM_TYPES, 'Select a claim type'),
  incidentDate: z
    .string()
    .min(1, 'Incident date is required')
    .refine(isNotFutureDate, 'Incident date cannot be in the future'),
  incidentDescription: z
    .string()
    .trim()
    .min(20, 'Provide at least 20 characters describing what happened')
    .max(1000, 'Keep the description under 1000 characters'),
  policeReportFiled: z.boolean(),
  policeReportNumber: z.string(),

  // Auto claim fields
  vehicleMake: z.string(),
  vehicleModel: z.string(),
  vehicleYear: z.string(),
  licensePlate: z.string(),
  otherPartyInvolved: z.boolean(),
  otherParty: z.object({
    name: z.string(),
    phone: z.string(),
    insuranceCompany: z.string(),
  }),

  // Property claim fields
  propertyAddress: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
  }),
  damageType: z.enum(DAMAGE_TYPES).or(z.literal('')),
  estimatedRepairCost: z.string(),
})

const damagedItemSchema = z.object({
  description: z.string().trim().min(2, 'Add a short description').max(200),
  estimatedValue: z.coerce
    .number('Enter an amount')
    .positive('Enter an amount greater than 0'),
})

const witnessSchema = z.object({
  name: z.string().trim().min(1, 'Witness name is required'),
  phone: phoneField(),
  statement: z.string().trim().max(500, 'Keep the statement under 500 characters'),
})

const additionalInfoSchema = z.object({
  contactPreference: z.enum(CONTACT_PREFERENCES),
  notes: z.string().trim().max(2000, 'Keep notes under 2000 characters'),
  agreeToTerms: z
    .boolean()
    .refine((value) => value, 'You must agree to the terms to submit a claim'),
})

export const insuranceClaimSchema = z
  .object({
    policyholder: policyholderSchema,
    claim: claimSchema,
    damagedItems: z
      .array(damagedItemSchema)
      .min(1, 'Add at least one damaged or lost item')
      .max(20, 'Limit to 20 items'),
    witnesses: z.array(witnessSchema).max(5, 'Limit to 5 witnesses'),
    additional: additionalInfoSchema,
  })
  .superRefine((data, ctx) => {
    const { claim } = data

    if (claim.policeReportFiled && !isNonEmpty(claim.policeReportNumber)) {
      ctx.addIssue({
        code: 'custom',
        path: ['claim', 'policeReportNumber'],
        message: 'Enter the police report number',
      })
    }

    if (claim.claimType === 'auto') {
      if (!isNonEmpty(claim.vehicleMake)) {
        ctx.addIssue({
          code: 'custom',
          path: ['claim', 'vehicleMake'],
          message: 'Vehicle make is required',
        })
      }
      if (!isNonEmpty(claim.vehicleModel)) {
        ctx.addIssue({
          code: 'custom',
          path: ['claim', 'vehicleModel'],
          message: 'Vehicle model is required',
        })
      }
      const vehicleYear = Number(claim.vehicleYear)
      if (
        !isNonEmpty(claim.vehicleYear) ||
        !Number.isInteger(vehicleYear) ||
        vehicleYear < 1980 ||
        vehicleYear > CURRENT_YEAR + 1
      ) {
        ctx.addIssue({
          code: 'custom',
          path: ['claim', 'vehicleYear'],
          message: `Enter a valid year between 1980 and ${CURRENT_YEAR + 1}`,
        })
      }
      if (!isNonEmpty(claim.licensePlate)) {
        ctx.addIssue({
          code: 'custom',
          path: ['claim', 'licensePlate'],
          message: 'License plate is required',
        })
      }

      if (claim.otherPartyInvolved) {
        if (!isNonEmpty(claim.otherParty.name)) {
          ctx.addIssue({
            code: 'custom',
            path: ['claim', 'otherParty', 'name'],
            message: "Other party's name is required",
          })
        }
        if (!PHONE_REGEX.test(claim.otherParty.phone.trim())) {
          ctx.addIssue({
            code: 'custom',
            path: ['claim', 'otherParty', 'phone'],
            message: 'Enter a valid phone number',
          })
        }
        if (!isNonEmpty(claim.otherParty.insuranceCompany)) {
          ctx.addIssue({
            code: 'custom',
            path: ['claim', 'otherParty', 'insuranceCompany'],
            message: "Other party's insurance company is required",
          })
        }
      }
    }

    if (claim.claimType === 'property') {
      if (!isNonEmpty(claim.propertyAddress.street)) {
        ctx.addIssue({
          code: 'custom',
          path: ['claim', 'propertyAddress', 'street'],
          message: 'Street address is required',
        })
      }
      if (!isNonEmpty(claim.propertyAddress.city)) {
        ctx.addIssue({
          code: 'custom',
          path: ['claim', 'propertyAddress', 'city'],
          message: 'City is required',
        })
      }
      if (claim.propertyAddress.state.trim().length !== 2) {
        ctx.addIssue({
          code: 'custom',
          path: ['claim', 'propertyAddress', 'state'],
          message: 'Use a 2-letter state code',
        })
      }
      if (!ZIP_REGEX.test(claim.propertyAddress.zipCode.trim())) {
        ctx.addIssue({
          code: 'custom',
          path: ['claim', 'propertyAddress', 'zipCode'],
          message: 'Enter a valid ZIP code',
        })
      }
      if (claim.damageType === '') {
        ctx.addIssue({
          code: 'custom',
          path: ['claim', 'damageType'],
          message: 'Select a damage type',
        })
      }
      const repairCost = Number(claim.estimatedRepairCost)
      if (!isNonEmpty(claim.estimatedRepairCost) || !(repairCost > 0)) {
        ctx.addIssue({
          code: 'custom',
          path: ['claim', 'estimatedRepairCost'],
          message: 'Enter an amount greater than 0',
        })
      }
    }
  })

export type InsuranceClaimFormInput = z.input<typeof insuranceClaimSchema>
export type InsuranceClaimFormValues = z.infer<typeof insuranceClaimSchema>
