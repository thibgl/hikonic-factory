import type { CollectionConfig, Field } from 'payload'

interface Identity {
  singular: string
  plural: string
}

export interface FactoryIdentity {
  factory: Identity
  products: Identity
}

export interface OptionalCollection extends Omit<CollectionConfig, 'slug' | 'fields'> {
  fields?: Field[]
}
