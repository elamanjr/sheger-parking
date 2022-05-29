import React from 'react'

export default function ErrorDisplay({design,message}) {
  return (
    <div className={design}>{message}</div>
  )
}
