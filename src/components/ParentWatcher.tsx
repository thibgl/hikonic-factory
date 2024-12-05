'use client'

import { useFormFields, useField, useForm, useDocumentEvents } from '@payloadcms/ui'
import { useEffect, useRef } from 'react'
import { useFactoryDoc, useFactoryRefetch } from '../context/FactoryContext'

export const ParentWatcher: React.FC<{ path: string }> = (props) => {
  const { path } = props
  const parentId = useFormFields(([fields]) => fields?.parent?.value)
  const { value, setValue } = useField({ path })
  const { doc } = useFactoryDoc(parentId || '')
  const refetch = useFactoryRefetch()
  const prevUpdateRef = useRef<string | null>(null)

  const { mostRecentUpdate } = useDocumentEvents()

  useEffect(() => {
    if (mostRecentUpdate !== prevUpdateRef.current) {
      prevUpdateRef.current = mostRecentUpdate
      if (mostRecentUpdate) {
        refetch()
      }
    }
  }, [mostRecentUpdate, refetch])

  useEffect(() => {
    if (parentId && value && parentId !== value.id && doc) {
      setValue(doc)
    }
  }, [parentId, value, setValue, doc])

  return null
}
