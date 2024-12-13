// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { iconifyPlugin } from '@/plugins/iconify'
import { skeletonPlugin } from '@/plugins/skeleton'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { sqliteAdapter } from '@payloadcms/db-sqlite'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

import { Blocks } from './collections/Blocks'
import { Website } from './globals/Website'

import { Factories } from './collections/Factories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      providers: ['/plugins/factory/context/FactoryContext#FactoryProvider'],
    },
  },
  globals: [Website],
  collections: [Users, Media, Blocks, ...Factories],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
    transactionOptions: false,
  }),
  // db: sqliteAdapter({
  //   client: {
  //     url: process.env.DATABASE_URL,
  //     authToken: process.env.DATABASE_AUTH_TOKEN,
  //   },
  // }),
  sharp,
  plugins: [
    iconifyPlugin(),
    skeletonPlugin({
      clientPath: '../client',
    }),
    payloadCloudPlugin(),
    seoPlugin({
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => {
        return `Website.com — ${doc.title}`
      },
      generateDescription: ({ doc }) => doc.excerpt,
    }),
    // storage-adapter-placeholder
  ],
})
