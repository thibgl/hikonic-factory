import type { Field } from 'payload'

export interface Colors {
  n: 1 | 2 | 3
}

interface ColorsFieldArgs {
  n?: Colors
  name?: string
}

export const ColorsField = ({ n, name = 'colors' }: ColorsFieldArgs = {}): Field => ({
  name,
  type: 'text',
  hasMany: true,
  admin: {
    components: {
      Field: {
        path: 'src/plugins/skeleton/components/SelectColor#SelectColor',
        // clientProps: {
        //   n,
        // },
      },
    },
  },
})
