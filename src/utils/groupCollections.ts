import { CollectionConfig } from 'payload'

const groupCollections = (group: string, collections: CollectionConfig[]): CollectionConfig[] => {
    return collections.map(collection => {
        return {
            ...collection,
            admin: {
                ...collection.admin,
                group,
            },
        }
    })
}


export default groupCollections