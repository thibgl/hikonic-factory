'use client'

import { useFormFields, useField, useForm, useDocumentEvents } from '@payloadcms/ui'
import { useEffect, useRef } from 'react'
import { useFactoryDoc, useFactoryRefetch } from '../context/FactoryContext'

export const FactoryWatcher: React.FC<{ path: string }> = (props) => {
  const { path } = props
  const factoryId = useFormFields(([fields]) => fields?.factory?.value)
  const { value, setValue } = useField({ path })
  const { doc } = useFactoryDoc(factoryId || '')
  const refetch = useFactoryRefetch()
  const prevUpdateRef = useRef<string | null>(null)

  const { mostRecentUpdate } = useDocumentEvents()

  useEffect(() => {
    if (
      mostRecentUpdate?.entitySlug &&
      mostRecentUpdate?.entitySlug === 'v2indexes' &&
      mostRecentUpdate !== prevUpdateRef.current
    ) {
      prevUpdateRef.current = mostRecentUpdate
      if (mostRecentUpdate) {
        refetch()
      }
    }
  }, [mostRecentUpdate, refetch])

  useEffect(() => {
    if (factoryId && value && factoryId !== value.id && doc) {
      setValue(doc)
    }
  }, [factoryId, value, setValue, doc])

  return null
}
