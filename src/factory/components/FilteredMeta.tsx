'use client'

import { useCallback, useRef } from 'react'
import { useField, useDocumentInfo, useForm, SelectInput } from '@payloadcms/ui'

export const InstallIconSets: TextFieldClientComponent = (props) => {
  const { path } = props
  const { value, setValue } = useField<string[]>({ path })
  const { setProcessing, setModified, disabled } = useForm()

//   const handleChange = useCallback(
//     (options: OptionObject[]) => {
//       console.log('options', options)
//       const currentValue = options.map((option) => option.value)
//       setProcessing(true)

//       if ([...currentValue].sort().equals(initialValuesRef.current)) {
//         setModified(false)
//       } else {
//         setModified(true)
//       }

//       setValue(currentValue)
//       setProcessing(false)
//     },
//     [setValue, setModified, setProcessing],
//   )

  return (
    // <div className="field-type select">
    //   <label className="field-label">Sets</label>
    //   <SelectInput
    //     readOnly={disabled}
    //     path={path}
    //     name={path}
    //     options={initialData.sets.options}
    //     value={value}
    //     hasMany={true}
    //     onChange={handleChange}
    //     isSortable={false}
    //   />
    // </div>
  )
}
