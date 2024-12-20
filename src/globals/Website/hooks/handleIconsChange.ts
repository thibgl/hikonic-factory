import type { CollectionAfterChangeHook } from 'payload'
import type { Icon } from '@/plugins/iconify/types/icon'

export const handleIconsChange: CollectionAfterChangeHook = async ({ previousDoc, doc }) => {
  const icons = JSON.stringify(doc.icons)

  if (JSON.stringify(previousDoc.icons) !== icons) {
    try {
      const response = await fetch(`${process.env.CLIENT_HOST}/api/icons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: icons,
      })
      console.log('Client notification response:', response.status)
    } catch (error) {
      console.error('Failed to notify client:', error)
    }
  }
  return doc
}
