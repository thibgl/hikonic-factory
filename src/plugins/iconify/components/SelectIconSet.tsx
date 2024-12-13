'use client'
import '../utils/arrayEquals'
import logger from '../utils/logger'

import type { TextFieldClientComponent, OptionObject } from 'payload'

import { useState, useEffect } from 'react'
import {
  useField,
  useForm,
  SelectInput,
  usePayloadAPI,
  withCondition,
} from '@payloadcms/ui'

const SelectIconSetComponent: TextFieldClientComponent = (props) => {
  const { path } = props
  const { value, setValue } = useField<string[]>({ path })
  const [{ data, isLoading }] = usePayloadAPI('/api/globals/iconify')
  const [options, setOptions] = useState<OptionObject[]>([])
  const { disabled } = useForm()

  useEffect(() => {
    if (!isLoading && data) {
      const options = data.sets.options.filter((option: OptionObject) =>
        data.sets.installed.includes(option.value),
      )
      setOptions(options)
    }
  }, [data, isLoading])

  return (
    <div className="field-type select">
      <label className="field-label">Set</label>
      <SelectInput
        readOnly={disabled}
        path={path}
        name={path}
        options={options}
        value={value}
        onChange={(option) => {
          setValue(option?.value || '')
        }}
      />
    </div>
  )
}

export const SelectIconSet = withCondition(SelectIconSetComponent)
