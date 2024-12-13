import { GlobalConfig } from 'payload'

const groupGlobals = (group: string, collections: GlobalConfig[]): GlobalConfig[] => {
  return collections.map((collection) => {
    return {
      ...collection,
      admin: {
        ...collection.admin,
        group,
      },
    }
  })
}

export default groupGlobals
