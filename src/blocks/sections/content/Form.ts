import type { Block } from 'payload'

const Form: Block = {
  slug: 'Form',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      filterOptions: () => ({
        hasModal: { equals: true },
      }),
    },
  ],
}

export default Form
