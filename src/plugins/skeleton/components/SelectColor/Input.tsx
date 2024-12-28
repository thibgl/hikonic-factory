'use client'
import type { OptionObject } from 'payload'

import { FC } from 'react'
import Select, { components } from 'react-select'
import { ReactSelect, fieldBaseClass } from '@payloadcms/ui'

export interface ColorOption {
  value: string
  label: string
  rgb: string
}

export type SelectInputProps = {
  readonly label?: string
  readonly onChange?: any // ReactSelectAdapterProps['onChange']
  readonly options?: ColorOption[]
  readonly path: string
  readonly readOnly?: boolean
  readonly showError?: boolean
  readonly value?: ColorOption
}

export const SelectColorInput: FC<SelectInputProps> = (props) => {
  const { label, onChange, options, path, value, readOnly, showError } = props

  const customStyles = {
    menuList: (base: any) => ({
      ...base,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
      padding: '7px',
      overflowY: 'auto',
    }),
    option: (base: any) => ({
      ...base,
      width: '40px',
      height: '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      borderRadius: '4px',
    }),
    control: (base: any, state: any) => {
      return {
        ...base,
        ...(state?.hasValue && { padding: '0px 12px' }),
      }
    },
    singleValue: (base: any) => ({
      ...base,
      display: 'flex',
      alignItems: 'center',
    }),
  }

  const Option = ({ children, ...props }: any) => {
    const { data } = props
    return (
      <components.Option {...props}>
        <div style={{ cursor: 'pointer' }} title={data.label}>
          <div style={{ background: `rgb(${data.rgb})`, width: '30px', height: '30px' }} />
        </div>
      </components.Option>
    )
  }

  const SingleValue = ({ children, ...props }: any) => {
    const { getValue, hasValue } = props
    const selectedValue = getValue()[0]

    return (
      <components.SingleValue {...props}>
        {hasValue && selectedValue && (
          <>
            <div
              style={{ background: `rgb(${selectedValue.rgb})`, width: '30px', height: '30px' }}
            />
            <span className="icon-name" style={{ marginLeft: '7px' }}>
              {selectedValue.label}
            </span>
          </>
        )}
      </components.SingleValue>
    )
  }

  return (
    <div
      className={[fieldBaseClass, 'select', showError && 'error', readOnly && 'read-only']
        .filter(Boolean)
        .join(' ')}
      id={`field-${path.replace(/\./g, '__')}`}
    >
      {label && (
        <label className="field-label" htmlFor={path}>
          {label}
        </label>
      )}
      <div className={`${fieldBaseClass}__wrap`}>
        <Select
          disabled={readOnly}
          onChange={onChange}
          options={options as OptionObject[]}
          showError={showError}
          value={value as OptionObject}
          styles={customStyles}
          components={{ Option, SingleValue }}
        />
      </div>
    </div>
  )
}
