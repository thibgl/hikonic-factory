'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Collection } from 'payload'

interface FactoryContextType {
  docs: any[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

const FactoryContext = createContext<FactoryContextType | undefined>(undefined)

export const FactoryProvider = ({
  collection = 'v2indexes',
  children,
}: {
  collection: string
  children: React.ReactNode
}) => {
  const [docs, setDocs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchDocs = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/${collection}`)
      const data = await response.json()
      console.log('data', data)
      setDocs(data.docs)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch docs'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocs()
  }, [collection])

  return (
    <FactoryContext.Provider
      value={{
        docs,
        loading,
        error,
        refetch: fetchDocs,
      }}
    >
      {children}
    </FactoryContext.Provider>
  )
}

export const useFactory = () => {
  const context = useContext(FactoryContext)
  if (context === undefined) {
    throw new Error('useFactory must be used within a FactoryProvider')
  }
  return context
}

export const useFactoryDoc = (id: string) => {
  const { docs, loading, error } = useFactory()

  const doc = docs.find((doc) => doc.id === id)

  return {
    doc,
    loading,
    error,
    exists: !!doc,
  }
}

export const useFactoryRefetch = () => {
  const { refetch } = useFactory()
  return refetch
}
