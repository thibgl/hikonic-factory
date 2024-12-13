'use client'

import '../../utils/arrayEquals'
import logger from '../../utils/logger'

import type { OptionObject, SelectFieldClientComponent } from 'payload'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  useForm,
  Collapsible,
  useFormFields,
  usePayloadAPI,
  useField,
  withCondition,
  SelectInput,
  useDocumentEvents,
} from '@payloadcms/ui'
import { SelectIconInput } from './Input'

function usePreviousSet<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

function usePreviousUpdate(mostRecentUpdate: {
  id: string
  entitySlug: string
  updatedAt: string
}) {
  const ref = useRef<string | undefined>(undefined)
  useEffect(() => {
    if (mostRecentUpdate) {
      ref.current = mostRecentUpdate.updatedAt
    }
  }, [mostRecentUpdate])
  return ref.current
}

import { IconOption } from './Input'

const SelectIconComponent: SelectFieldClientComponent = (props) => {
  const { path, field } = props
  const rootPath = path.split('.').slice(0, -1).join('.')

  const iconSet = useFormFields(([fields, dispatch]) => fields[`${rootPath}.set`]?.value)
  const { value: icon, setValue: setIcon, showError } = useField<string>({ path })
  const { value: iconSvgField, setValue: setIconSvgField } = useField<string>({
    path: `${rootPath}.svg`,
  })

  const [{ data, isLoading }] = usePayloadAPI(
    `/api/iconifySets?[where][prefix][equals]=${iconSet}&limit=1`,
  )
  const { disabled } = useForm()
  const readOnly = disabled || isLoading
  const { mostRecentUpdate } = useDocumentEvents()
  const [filters, setFilters] = useState({ category: '', prefix: '', suffix: '' })
  const [iconMatchesFilters, setIconMatchesFilters] = useState(false)

  const iconSetData = useMemo(() => (data?.docs?.length > 0 ? data.docs[0] : undefined), [data])
  const allIconOptions = useMemo<IconOption[]>(() => {
    if (!iconSetData) return []
    return iconSetData.icons.options.filter((iconOption: IconOption) => !iconOption.hidden)
  }, [iconSetData])

  const prevIconSetPrefix = usePreviousSet(iconSet)
  const previousUpdate = usePreviousUpdate(mostRecentUpdate)

  const [iconFieldKey, setIconFieldKey] = useState(0)
  const [filterFieldsKey, setfilterFieldsKey] = useState(0)
  const resetIconField = useCallback(() => {
    setIconFieldKey((prev) => prev + 1)
    setIcon('')
  }, [setIconFieldKey, setIcon])
  const resetFilterFields = useCallback(() => {
    setfilterFieldsKey((prev) => prev + 1)
    setFilters({ category: '', prefix: '', suffix: '' })
  }, [setfilterFieldsKey, setFilters])

  const iconOptions = useMemo(() => {
    if (!iconSetData) return []
    let filteredIconOptions = allIconOptions

    const { category, prefix, suffix } = filters

    if (category && iconSetData.filters.categories) {
      filteredIconOptions = filteredIconOptions.filter((iconOption: IconOption) =>
        iconSetData.categories[category].includes(iconOption.value),
      )
    }

    if (prefix && iconSetData.filters.prefixes) {
      if (prefix === 'regular') {
        filteredIconOptions = filteredIconOptions.filter(
          (iconOption: IconOption) =>
            !iconSetData.filters.prefixes.some(
              (prefixOption: OptionObject) =>
                prefixOption.value !== 'regular' && iconOption.value.startsWith(prefixOption.value),
            ),
        )
      } else {
        filteredIconOptions = filteredIconOptions.filter((iconOption: IconOption) =>
          iconOption.value.startsWith(prefix),
        )
      }
    }

    if (suffix && iconSetData.filters.suffixes) {
      if (suffix === 'regular') {
        filteredIconOptions = filteredIconOptions.filter(
          (iconOption: IconOption) =>
            !iconSetData.filters.suffixes.some(
              (suffixOption: OptionObject) =>
                suffixOption.value !== 'regular' &&
                iconOption.value.endsWith('-' + suffixOption.value),
            ),
        )
      } else {
        filteredIconOptions = filteredIconOptions.filter((iconOption: IconOption) =>
          iconOption.value.endsWith('-' + suffix),
        )
      }
    }

    return filteredIconOptions
  }, [allIconOptions, filters])

  const selectedIcon: IconOption | undefined = useMemo(() => {
    if (iconSetData) {
      return allIconOptions.find((option: IconOption) => option.value === icon) || undefined
    } else if (icon) {
      return { value: icon, body: '' }
    } else {
      return undefined
    }
  }, [allIconOptions, icon])

  useEffect(() => {
    if (iconSetData && iconSetData.prefix !== prevIconSetPrefix && icon) {
      resetIconField()
      resetFilterFields()
    }
  }, [iconSetData, prevIconSetPrefix])

  const onFilterChange = useCallback(
    (filterOption: OptionObject | null, filterType: 'category' | 'prefix' | 'suffix') => {
      if (!disabled) {
        setFilters((prev) => ({ ...prev, [filterType]: filterOption?.value || '' }))
      }
    },
    [disabled],
  )

  useEffect(() => {
    if (icon && iconSetData) {
      let iconBaseName = icon

      if (iconSetData.filters.prefixes) {
        const previousPrefix = iconSetData.filters.prefixes.find(
          (prefixOption: OptionObject) =>
            prefixOption.value !== 'regular' && iconBaseName.startsWith(prefixOption.value),
        )?.value
        if (previousPrefix) iconBaseName = iconBaseName.replace(previousPrefix + '-', '')
      }

      if (iconSetData.filters.suffixes) {
        const previousSuffix = iconSetData.filters.suffixes.find(
          (suffixOption: OptionObject) =>
            suffixOption.value !== 'regular' && iconBaseName.endsWith(suffixOption.value),
        )?.value
        if (previousSuffix) iconBaseName = iconBaseName.replace('-' + previousSuffix, '')
      }
      const siblingIcons = iconOptions
        .filter((option: OptionObject) => option.value.includes(iconBaseName))
        .map((option: OptionObject) => option.value)

      if (siblingIcons.length > 0) {
        if (siblingIcons.includes(icon)) {
          setIconMatchesFilters(true)
        } else {
          setIcon(siblingIcons[0])
        }
      } else {
        setIconMatchesFilters(false)
      }
    }
  }, [iconOptions, icon])

  useEffect(() => {
    if (iconSetData && iconSvgField && selectedIcon) {
      const iconSvg = `<svg viewBox="0 0 ${selectedIcon.width || iconSetData.icons.width} ${selectedIcon.height || iconSetData.icons.height}" xmlns="http://www.w3.org/2000/svg">${selectedIcon.body}</svg>`

      if (iconSvg !== iconSvgField) {
        setIconSvgField(iconSvg)
      }
    }
  }, [selectedIcon])

  useEffect(() => {
    if (mostRecentUpdate && mostRecentUpdate.updatedAt !== previousUpdate) {
      resetFilterFields()
    }
  }, [mostRecentUpdate])

  const onIconChange = useCallback(
    (selectedIconOption: OptionObject) => {
      if (!disabled) {
        setIcon(selectedIconOption?.value || '')
      }
    },
    [disabled],
  )

  return (
    <>
      {iconSetData && Object.keys(iconSetData.filters).length > 0 && (
        <div className="field-type collapsible-field">
          <Collapsible initCollapsed={true} header="Filters" key={filterFieldsKey}>
            <div className="render-fields">
              {iconSetData.filters.categories && (
                <div className="field-type select">
                  <label className="field-label">Category</label>
                  <SelectInput
                    key={filterFieldsKey}
                    readOnly={readOnly}
                    path={`${path}.category`}
                    name={`${path}.category`}
                    options={iconSetData.filters.categories}
                    value={filters.category}
                    onChange={(option) => onFilterChange(option as OptionObject, 'category')}
                  />
                </div>
              )}
              {iconSetData.filters.prefixes && (
                <div className="field-type select">
                  <label className="field-label">Prefix</label>
                  <SelectInput
                    key={filterFieldsKey}
                    readOnly={readOnly}
                    path={`${path}.prefix`}
                    name={`${path}.prefix`}
                    options={iconSetData.filters.prefixes}
                    value={filters.prefix}
                    onChange={(option) => onFilterChange(option as OptionObject, 'prefix')}
                  />
                </div>
              )}
              {iconSetData.filters.suffixes && (
                <div className="field-type select">
                  <label className="field-label">Suffix</label>
                  <SelectInput
                    key={filterFieldsKey}
                    readOnly={readOnly}
                    path={`${path}.suffix`}
                    name={`${path}.suffix`}
                    options={iconSetData.filters.suffixes}
                    value={filters.suffix}
                    onChange={(option) => onFilterChange(option as OptionObject, 'suffix')}
                  />
                </div>
              )}
            </div>
          </Collapsible>
        </div>
      )}
      <SelectIconInput
        key={iconFieldKey}
        field={field}
        onChange={onIconChange}
        options={iconOptions}
        path={path}
        readOnly={readOnly}
        showError={showError}
        value={selectedIcon as IconOption}
        viewBox={{ width: iconSetData?.icons.width, height: iconSetData?.icons.height }}
        iconMatchesFilters={iconMatchesFilters}
      />
    </>
  )
}

export const SelectIcon = withCondition(SelectIconComponent)
