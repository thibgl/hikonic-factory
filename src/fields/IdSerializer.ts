// use the text field
import type { Field } from 'payload'

export const IdSerializer = (field: Field): Field[] => [
  {
    ...field,
    access: {
      ...field.access,
      read: ({ req: { user } }) => Boolean(user),
    },
  },
  {
    name: `${field.name}Id`,
    type: 'text',
    hasMany: field.hasMany,
    admin: {
      hidden: true,
    },
    hooks: {
      beforeValidate: [
        async ({ siblingData }) => {
          return siblingData[field.name]?.value || siblingData[field.name]
        },
      ],
    },
  },
]
