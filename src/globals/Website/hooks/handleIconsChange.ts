import type { CollectionAfterChangeHook } from 'payload'
import type { Icon } from '@/plugins/iconify/types/icon'

export const handleIconsChange: CollectionAfterChangeHook = async ({ previousDoc, doc }) => {
  const ui = JSON.stringify(doc.ui)
  console.log(ui)
  if (JSON.stringify(previousDoc.ui) !== ui) {
    try {
      const response = await fetch(`${process.env.CLIENT_HOST}/api/icons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: ui,
      })
      console.log('Client notification response:', response.status)
    } catch (error) {
      console.error('Failed to notify client:', error)
    }
  }
  return doc
}
