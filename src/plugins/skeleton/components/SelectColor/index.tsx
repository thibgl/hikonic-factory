'use client'
import '../../utils/arrayEquals'
import logger from '../../utils/logger'

import type { SelectFieldClientComponent } from 'payload'
import type { ColorOption } from './Input'

import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'

import { useForm, useField, withCondition, usePayloadAPI, useFormFields } from '@payloadcms/ui'
import { SelectColorInput } from './Input'

const SelectColorComponent: SelectFieldClientComponent = (props) => {
  console.log('SELECT COLOR')
  const { path, field } = props
  // const n = props.field.admin?.clientProps?.n || 1
  const n = useFormFields(([fields]) => {
    console.log(fields)
    return Number(fields.factoryData.value.options?.colors)
  })
  console.log(n)
  const [{ data, isLoading }] = usePayloadAPI('/api/globals/skeleton')
  const { value: colors = [], setValue: setColors, showError } = useField<string[]>({ path })
  const colorOptions = useMemo(() => {
    if (!isLoading && data) {
      return data.theme.colors
    }
    return undefined
  }, [data, isLoading])

  const [fieldKeys, setFieldKeys] = useState([0, 1, 2])
  const resetColorField = useCallback(
    (index: number) => {
      setFieldKeys((prev) => {
        return prev.map((key) => key + 1)
      })
    },
    [setFieldKeys],
  )

  const { disabled } = useForm()
  const readOnly = disabled || !colorOptions

  const selectedColors: (ColorOption | undefined)[] = useMemo(() => {
    return colors.map((colorValue) => {
      if (colorOptions) {
        return colorOptions.find((option) => option.value === colorValue) || undefined
      }
      return colorValue ? { value: colorValue, label: colorValue, rgb: '' } : undefined
    })
  }, [colors, colorOptions])

  const onColorChange = useCallback(
    (selectedColorOption: ColorOption, index: number) => {
      if (disabled) return
      const newColors = [...colors]
      if (selectedColorOption) {
        newColors[index] = selectedColorOption.value
      } else {
        newColors.splice(index, 1)
        if (index < n - 1) resetColorField(index + 1)
      }
      setColors(newColors)
    },
    [disabled, colors, setColors, n, resetColorField],
  )

  const prevN = useRef(n)

  useEffect(() => {
    if (n < prevN.current && colors.length > n) {
      // Trim colors array if n decreased
      setColors(colors.slice(0, n))
    }
    prevN.current = n
  }, [n, colors, setColors])

  return (
    <>
      {n ? (
        <div className="field-type group-field group-field--top-level">
          <div className="group-field__wrap">
            <div className="group-field__header">
              <header>
                <h3 className="group-field__title">{n > 1 ? 'Colors' : 'Color'}</h3>
              </header>
            </div>
            <div className="render-fields render-fields--margins-small">
              <SelectColorInput
                label={n > 1 && 'From'}
                field={field}
                key={fieldKeys[0]}
                onChange={(color) => {
                  onColorChange(color, 0)
                }}
                options={colorOptions}
                path={path}
                readOnly={readOnly}
                showError={showError}
                value={selectedColors[0]}
              />
              {n > 1 && (
                <SelectColorInput
                  label="To"
                  key={fieldKeys[1]}
                  onChange={(color) => {
                    onColorChange(color, 1)
                  }}
                  options={colorOptions}
                  path={path}
                  readOnly={readOnly || colors.length < 1}
                  showError={showError}
                  value={selectedColors[1]}
                />
              )}
              {n > 2 && (
                <SelectColorInput
                  label="Via"
                  key={fieldKeys[2]}
                  onChange={(color) => {
                    onColorChange(color, 2)
                  }}
                  options={colorOptions}
                  path={path}
                  readOnly={readOnly || colors.length < 2}
                  showError={showError}
                  value={selectedColors[2]}
                />
              )}
              {n > 1 && (
                <div className="field-type ui">
                  <label className="field-label">Preview</label>
                  <span
                    style={{
                      display: 'block',
                      overflow: 'hidden',
                      borderRadius: 'var(--style-radius-s)',
                      height: '30px',
                      background:
                        selectedColors.length > 0
                          ? `linear-gradient(to right, ${selectedColors
                              .filter((c): c is ColorOption => c !== undefined)
                              .map((c) => `rgb(${c.rgb})`)
                              .reduce((arr, color) => {
                                if (arr.length === 2) {
                                  return [arr[0], color, arr[1]]
                                }
                                return [...arr, color]
                              }, [] as string[])
                              .join(',')})`
                          : 'var(--theme-elevation-100)',
                    }}
                  ></span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export const SelectColor = withCondition(SelectColorComponent)
