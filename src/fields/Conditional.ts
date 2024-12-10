import type { Field } from 'payload'

interface ConditionalFieldArgs {
  field: Field | Field[]
  path: string
  value: any
  fallback?: boolean
  nullify?: boolean
  sibling?: boolean
  isTopLevel?: boolean
}

// Add these layout field types that should be excluded from hooks
const UNNULLIFIABLE_FIELDS = ['collapsible', 'group', 'row', 'tabs', 'ui', 'join']

export const ConditionalField = ({
  field,
  path,
  value,
  fallback = false,
  sibling = true,
  nullify = true,
  isTopLevel = true,
}: ConditionalFieldArgs): Field | Field[] => {
  if (Array.isArray(field)) {
    return field.map((singleField) =>
      ConditionalField({
        field: singleField,
        path,
        value,
        fallback,
        sibling,
        nullify,
        isTopLevel,
      }),
    )
  }

  // Create base processed field without condition
  const processedField = { ...field }

  // Apply condition to top-level fields or tab fields
  if (isTopLevel && field.type !== 'tabs') {
    processedField.admin = {
      ...field.admin,
      condition: (data, siblingData) => {
        const currentValue = getValue(sibling ? siblingData : data, path)
        return currentValue === value || fallback
      },
    }
  }

  // Add hooks if not a layout field and if nullify is true
  if (!UNNULLIFIABLE_FIELDS.includes(field.type) && nullify) {
    processedField.hooks = {
      ...field?.hooks,
      beforeValidate: [
        ...(field?.hooks?.beforeValidate || []),
        async ({ data, siblingData }) => {
          const currentValue = getValue(sibling ? siblingData : data, path)
          if (currentValue !== value) return null
        },
      ],
    }
  }

  // Process children fields, marking them as not top-level
  if ('fields' in field && Array.isArray(field.fields)) {
    processedField.fields = field.fields.map((subField) =>
      ConditionalField({
        field: subField,
        path,
        value,
        fallback,
        sibling,
        nullify,
        isTopLevel: false,
      }),
    )
  }

  return processedField
}

const getValue = (data: any, path: string) =>
  path.split('.').reduce((obj, part) => obj?.[part], data)
