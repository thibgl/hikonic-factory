'use client'

import { useFormFields } from '@payloadcms/ui'

export const Preview: React.FC = (props) => {
  const { path } = props
  const rootPath = path.split('.').slice(0, -1).join('.')
  const custom = useFormFields(([fields, dispatch]) => fields[`${rootPath}.custom`]?.value)
  const svgData = useFormFields(([fields, dispatch]) => fields[`${rootPath}.customSvg`]?.value)

  return (
    <>
      {custom && (
        <div className="field-type ui">
          <label className="field-label">Preview</label>
          <div className="thumbnail" style={{ width: '30px', height: '30px' }}>
            {svgData && <div dangerouslySetInnerHTML={{ __html: svgData }} />}
          </div>
        </div>
      )}
    </>
  )
}
