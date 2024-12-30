import { Field } from 'payload'
import { Section } from './sections'

export const WebsiteLayout: Field[] = [
  {
    name: 'hero',
    type: 'array',
    fields: Section(false),
    maxRows: 1,
  },
  {
    name: 'beforeMain',
    type: 'array',
    fields: Section(),
  },
  {
    name: 'afterMain',
    type: 'array',
    fields: Section(),
  },
  {
    name: 'footer',
    type: 'array',
    fields: Section(false),
    maxRows: 1,
  },
]
