'use client'

import { useFormFields, useField, useDocumentEvents } from '@payloadcms/ui'
import { useEffect, useRef, useCallback } from 'react'
import { useFactoryDoc, useManageCollection } from '../context/FactoryContext'
import { Field } from 'payload'

export const FactoryOverseer: React.FC<{ path: string; field: Field }> = ({ path, field }) => {
  const factorySlug = field.admin?.components?.clientProps?.factory
  const factoryId = useFormFields(([fields]) => fields?.factory?.value)
  const { value, setValue } = useField({ path })
  const { doc } = useFactoryDoc(factorySlug, factoryId || '')
  const manageCollection = useManageCollection(factorySlug)
  const prevUpdateRef = useRef<string | null>(null)
  console.log(doc)
  const handleManageCollection = useCallback(() => {
    if (factorySlug) {
      manageCollection()
    }
  }, [manageCollection])

  useEffect(() => {
    handleManageCollection()
  }, [])

  const { mostRecentUpdate } = useDocumentEvents()

  useEffect(() => {
    if (
      mostRecentUpdate?.entitySlug &&
      mostRecentUpdate?.entitySlug === factorySlug &&
      mostRecentUpdate !== prevUpdateRef.current
    ) {
      prevUpdateRef.current = mostRecentUpdate
      if (mostRecentUpdate) {
        handleManageCollection()
      }
    }
  }, [mostRecentUpdate, handleManageCollection, factorySlug])

  useEffect(() => {
    if (factoryId && value && factoryId !== value.id && doc) {
      setValue(doc)
    }
  }, [factoryId, value, setValue, doc])

  return null
}
