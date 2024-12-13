'use client'

import { createContext, useContext, useState } from 'react'

interface FactoryData {
  docs: any[]
  loading: boolean
  error: Error | null
}

interface FactoryContextType {
  collections: Map<string, FactoryData>
  initCollection: (slug: string) => Promise<void>
  refetchCollection: (slug: string) => Promise<void>
}

const FactoryContext = createContext<FactoryContextType | undefined>(undefined)

export const FactoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [collections, setCollections] = useState<Map<string, FactoryData>>(new Map())

  const fetchCollection = async (slug: string) => {
    setCollections((prev) =>
      new Map(prev).set(slug, {
        docs: prev.get(slug)?.docs || [],
        loading: true,
        error: null,
      }),
    )

    try {
      const response = await fetch(`/api/${slug}`)
      const data = await response.json()
      setCollections((prev) =>
        new Map(prev).set(slug, {
          docs: data.docs,
          loading: false,
          error: null,
        }),
      )
    } catch (err) {
      setCollections((prev) =>
        new Map(prev).set(slug, {
          docs: [],
          loading: false,
          error: err instanceof Error ? err : new Error('Failed to fetch docs'),
        }),
      )
    }
  }

  const initCollection = async (slug: string) => {
    if (!collections.has(slug)) {
      await fetchCollection(slug)
    }
  }

  return (
    <FactoryContext.Provider
      value={{
        collections,
        initCollection,
        refetchCollection: fetchCollection,
      }}
    >
      {children}
    </FactoryContext.Provider>
  )
}

export const useFactory = (slug: string) => {
  const context = useContext(FactoryContext)
  if (!context) {
    throw new Error('useFactory must be used within a FactoryProvider')
  }
  return context.collections.get(slug) || { docs: [], loading: false, error: null }
}

export const useFactoryDoc = (slug: string, id: string) => {
  const { docs, loading, error } = useFactory(slug)
  const doc = docs.find((doc) => doc.id === id)
  return { doc, loading, error, exists: !!doc }
}

export const useManageCollection = (slug: string) => {
  const context = useContext(FactoryContext)
  if (!context) {
    throw new Error('useManageCollection must be used within a FactoryProvider')
  }

  const { collections, initCollection, refetchCollection } = context

  const manageCollection = async () => {
    if (!collections.has(slug)) {
      await initCollection(slug)
    } else {
      await refetchCollection(slug)
    }
  }

  return manageCollection
}
