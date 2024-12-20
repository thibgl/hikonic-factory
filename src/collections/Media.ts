import { fileURLToPath } from 'url'
import path from 'path'
import type { CollectionConfig } from 'payload'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../../client/src/lib/media'),
  },
}
