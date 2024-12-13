import React from 'react'

interface WebviewProps {
  url: string
}

export const Webview: React.FC<WebviewProps> = ({ url = 'http://localhost:5173/admin/themer' }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '200vh',
        overflow: 'hidden',
      }}
    >
      <iframe
        src={url}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          overflow: 'hidden',
        }}
        title="Webview Content"
      />
    </div>
  )
}
