'use client'

import { useFormFields, useField, useDocumentEvents } from '@payloadcms/ui'
import { useEffect, useRef, useState } from 'react'
import { useFactoryDoc, useManageCollection } from '../context/FactoryContext'
import { Field } from 'payload'

export const FactoryOverseer: React.FC<{ path: string; field: Field }> = ({ path, field }) => {
  const factorySlug = field.admin?.components?.clientProps?.factory
  const [factoryId, dispatch] = useFormFields(([fields, dispatch]) => {
    return [fields?.factory?.value?.value || fields?.factory?.value, dispatch]
  })
  const { value, setValue } = useField({ path })
  const { doc } = useFactoryDoc(factorySlug, factoryId || '')
  const manageCollection = useManageCollection(factorySlug)
  const prevUpdateRef = useRef<any>({ updatedAt: '' })
  const [updated, setUpdated] = useState(false)
  console.log(doc)
  useEffect(() => {
    manageCollection()
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
        await manageCollection()
        dispatch({ type: 'UPDATE', path: 'factory', value: factoryId })
        setUpdated(true)
      }
    }

    updateDoc()
  }, [mostRecentUpdate, manageCollection, factorySlug])

  useEffect(() => {
    if (
      factoryId &&
      doc &&
      (!value || factoryId !== value.id || doc.updatedAt !== value.updatedAt)
    ) {
      setValue(doc)
      if (updated) {
        setUpdated(false)
      }
    }
  }, [factoryId, value, setValue, doc, updated, setUpdated])

  return null
}
