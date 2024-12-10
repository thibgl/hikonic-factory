import type { CollectionConfig, Field } from 'payload'

export interface FactoryIdentity {
  factory: string
  products?: string
}

export interface OptionalCollection extends Omit<CollectionConfig, 'fields'> {
  fields?: Field[]
}
