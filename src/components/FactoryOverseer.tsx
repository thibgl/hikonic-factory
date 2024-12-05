'use client'

import { useFormFields, useField, useDocumentEvents } from '@payloadcms/ui'
import { useEffect, useRef, useCallback, useState } from 'react'
import { useFactoryDoc, useManageCollection } from '../context/FactoryContext'
import { Field } from 'payload'

export const FactoryOverseer: React.FC<{ path: string; field: Field }> = ({ path, field }) => {
  const factorySlug = field.admin?.components?.clientProps?.factory
  const factoryId = useFormFields(
    ([fields]) => fields?.factory?.value?.value || fields?.factory?.value,
  )
  const { value, setValue } = useField({ path })
  const { doc } = useFactoryDoc(factorySlug, factoryId || '')
  const manageCollection = useManageCollection(factorySlug)
  const prevUpdateRef = useRef<any>({ updatedAt: '' })
  const [isDocUpdated, setIsDocUpdated] = useState(false)

  const handleManageCollection = useCallback(async () => {
    if (factorySlug) {
      await manageCollection()
      setIsDocUpdated(true)
    }
  }, [manageCollection, factorySlug])

  useEffect(() => {
    handleManageCollection()
  }, [])

  const { mostRecentUpdate } = useDocumentEvents()

  useEffect(() => {
    const updateDoc = async () => {
      if (
        mostRecentUpdate &&
        mostRecentUpdate.entitySlug === factorySlug &&
        mostRecentUpdate.updatedAt !== prevUpdateRef.current.updatedAt
      ) {
        prevUpdateRef.current = mostRecentUpdate
        await handleManageCollection()
      }
    }

    updateDoc()
  }, [mostRecentUpdate, handleManageCollection, factorySlug])

  useEffect(() => {
    if (isDocUpdated) {
      // console.log('Updated doc:', doc)
      setIsDocUpdated(false)
      setValue(doc)
    }
  }, [isDocUpdated, doc])

  useEffect(() => {
    if (factoryId && value && factoryId !== value.id && doc) {
      setValue(doc)
    }
  }, [factoryId, value, setValue, doc])

  return null
}
