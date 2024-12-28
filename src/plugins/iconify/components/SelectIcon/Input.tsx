'use client'

import type { OptionObject, SelectFieldClient } from 'payload'
import type { MarkOptional } from 'ts-essentials'

import { FC } from 'react'
import Select, { components } from 'react-select'
import { ReactSelect, FieldLabel, fieldBaseClass } from '@payloadcms/ui'

export interface IconOption {
  value: string
  body: string
  width?: number
  height?: number
  hidden?: boolean
}

type SelectInputProps = {
  readonly field?: MarkOptional<SelectFieldClient, 'type'>
  readonly onChange?: any // ReactSelectAdapterProps['onChange']
  readonly options?: IconOption[]
  readonly path: string
  readonly readOnly?: boolean
  readonly showError?: boolean
  readonly iconMatchesFilters?: boolean
  readonly value?: IconOption
}

interface ViewBox {
  width: number
  height: number
}

export const SelectIconInput: FC<SelectInputProps & { viewBox: ViewBox }> = (props) => {
  const {
    field,
    onChange,
    options,
    path,
    value,
    readOnly,
    showError,
    viewBox,
    iconMatchesFilters,
  } = props

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
      opacity: iconMatchesFilters ? 1 : 0.5,
    }),
  }

  const Option = ({ children, ...props }: any) => {
    const { data } = props
    return (
      <components.Option {...props}>
        <div style={{ cursor: 'pointer' }} title={data.value}>
          <svg
            width={30}
            height={30}
            viewBox={`0 0 ${data.width || viewBox.width} ${data.height || viewBox.height}`}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: data.body }}
          />
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
            {selectedValue.body && (
              <svg
                width={30}
                height={30}
                viewBox={`0 0 ${selectedValue.width || viewBox.width} ${selectedValue.height || viewBox.height}`}
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: selectedValue.body }}
              />
            )}
            <span className="icon-name" style={{ marginLeft: '7px' }}>
              {selectedValue.value}
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
      <FieldLabel field={field} />
      <div className={`${fieldBaseClass}__wrap react_select`}>
        <Select
          className="react_select"
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
