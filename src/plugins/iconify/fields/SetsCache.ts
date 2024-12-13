import type { Field } from 'payload'

export const SetsCache: Field[] = [
  // {
  //   name: 'iconifyCacheRequested',
  //   type: 'checkbox',
  //   virtual: true,
  //   defaultValue: false,
  //   admin: {
  //     hidden: true,
  //   },
  // },
  {
    name: 'iconifyCache',
    type: 'text',
    hasMany: true,
    virtual: true,
    defaultValue: [],
    admin: {
      hidden: true,
      readOnly: true,
    },
    validate: () => true,
  },
]
