import React from 'react'
import ErrorIcon from '../../../assets/icons/errorIcon/ErrorIcon'

const ErrorPanel = ({children}) => {
  return (
    <div className="relative mt-4 w-full pl-8 pr-3 py-1.5 bg-errorBackgroung rounded">
      <p className='font-Inter text-xs text-textPrimary'>{children}</p>
      <ErrorIcon className='absolute top-1.5 left-3'/>
    </div>
  )
}

export default ErrorPanel
