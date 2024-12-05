import type { Field } from 'payload'

interface ConditionalFieldArgs {
  field: Field
  path: string
  value: any
  fallback?: boolean
  nullify?: boolean
  sibling?: boolean
}

// Add these layout field types that should be excluded from hooks
const LAYOUT_FIELDS = ['collapsible', 'group', 'row', 'tabs', 'ui']

export const ConditionalField = ({
  field,
  path,
  value,
  fallback = true,
  sibling = true,
  nullify = true,
}: ConditionalFieldArgs): Field => {
  // Process the current field first
  const processedField = {
    ...field,
    admin: {
      ...field.admin,
      condition: (data, siblingData) => {
        const currentValue = getValue(sibling ? siblingData : data, path)
        return currentValue ? currentValue === value : fallback
      },
    },
  }

  // Add hooks if not a layout field
  if (!LAYOUT_FIELDS.includes(field.type)) {
    processedField.hooks = {
      ...field.hooks,
      beforeValidate: [
        ...(field.hooks?.beforeValidate || []),
        ...(nullify
          ? [
              async ({ data, siblingData }) => {
                const currentValue = getValue(sibling ? siblingData : data, path)
                if (currentValue !== value) return null
              },
            ]
          : []),
      ],
    }
  }

  // Then process its children if they exist
  if ('fields' in field && Array.isArray(field.fields)) {
    processedField.fields = field.fields.map((subField) =>
      ConditionalField({
        field: subField,
        path,
        value,
        fallback,
        sibling,
        nullify,
      }),
    )
  }

  return processedField
}

const getValue = (data: any, path: string) =>
  path.split('.').reduce((obj, part) => obj?.[part], data)
