import { ConditionalField } from './Conditional'

export const selectRelationFields = (relations: string[], hasMany: boolean) => [
  {
    name: 'relationTo',
    label: 'Collection',
    type: 'select',
    defaultValue: relations.length === 1 ? relations[0] : undefined,
    options: relations.map((relation) => ({
      label: relation.charAt(0).toUpperCase() + relation.slice(1),
      value: relation,
    })),
    admin: {
      condition: () => relations.length > 1,
    },
  },
  ...(relations.length > 1
    ? relations.map((relation) =>
        ConditionalField({
          path: 'relationTo',
          value: relation,
          field: {
            name: relation,
            label: 'Items',
            type: 'relationship',
            relationTo: relation,
            hasMany,
          },
        }),
      )
    : [
        {
          name: relations[0],
          type: 'relationship',
          relationTo: relations[0],
          hasMany,
        },
      ]),
]
