import type { CollectionAfterChangeHook } from 'payload'
import type { Icon } from '@/plugins/iconify/types/icon'

import fs from 'fs'

interface FormattedLocales {
  default: string
  locales: Array<{ label: string; code: string }>
}

interface Locale {
  name: string
  code: string
  id: string
  icon: Icon
}

export const handleLocalesChange: CollectionAfterChangeHook = async ({ doc }) => {
  const formattedLocales: FormattedLocales = {
    default: '',
    locales: [] as Array<{ label: string; code: string }>,
  }

  doc.localization.locales.forEach((locale: Locale, index: number) => {
    if (index === 0) formattedLocales['default'] = locale.code
    formattedLocales['locales'].push({
      label: locale.name,
      code: locale.code,
    })
  })

  const localesPath = 'src/config/localization.json'
  const currentLocales = fs.readFileSync(localesPath, 'utf8')
  if (currentLocales !== JSON.stringify(formattedLocales, null, 2)) {
    fs.writeFileSync(localesPath, JSON.stringify(formattedLocales, null, 2))

    try {
      console.log('Attempting to notify client at:', `${process.env.CLIENT_HOST}/api/config`)
      const response = await fetch(`${process.env.CLIENT_HOST}/api/config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedLocales),
      })
      console.log('Client notification response:', response.status)
    } catch (error) {
      console.error('Failed to notify client:', error)
    }
  }

  return doc
}
