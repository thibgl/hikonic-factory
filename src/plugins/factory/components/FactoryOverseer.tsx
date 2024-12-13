'use client'

import { useFormFields, useField, useDocumentEvents } from '@payloadcms/ui'
import { useEffect, useRef, useState } from 'react'
import { useFactoryDoc, useManageCollection } from '../context/FactoryContext'
import { Field } from 'payload'

export const FactoryOverseer: React.FC<{ path: string; field: Field; factory: string }> = ({
  path,
  field,
  factory,
}) => {
  const [factoryId, dispatch] = useFormFields(([fields, dispatch]) => {
    return [fields?.factory?.value?.value || fields?.factory?.value, dispatch]
  })
  const { value, setValue } = useField({ path })
  const { doc } = useFactoryDoc(factory, factoryId || '')
  const manageCollection = useManageCollection(factory)
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
        mostRecentUpdate.entitySlug === factory &&
        mostRecentUpdate.updatedAt !== prevUpdateRef.current.updatedAt
      ) {
        prevUpdateRef.current = mostRecentUpdate
        await manageCollection()
        dispatch({ type: 'UPDATE', path: 'factory', value: factoryId })
        setUpdated(true)
      }
    }

    updateDoc()
  }, [mostRecentUpdate, manageCollection, factory])

  useEffect(() => {
    if (
      factoryId &&
      doc &&
      (!value || factoryId !== value.id || doc.updatedAt !== value.updatedAt)
    ) {
      const data = {
        id: doc.id,
        updatedAt: doc.updatedAt,
        options: doc.options || {},
        meta: Object.entries(doc.meta).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value.map((link) => link.id),
          }),
          {},
        ),
      }
      console.log(data)
      setValue(data)
      if (updated) {
        setUpdated(false)
      }
    }
  }, [factoryId, value, setValue, doc, updated, setUpdated])

  return null
}
