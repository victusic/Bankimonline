import React from 'react'
import WarningIcon from '../../../assets/icons/warningIcon/WarningIcon'

const WarningPanel = ({children}) => {
  return (
    <div className="relative mt-4 w-full pl-8 pr-3 py-1.5 bg-baseSecondary rounded">
      <p className='font-Inter text-xs text-textPrimary'>{children}</p>
      <WarningIcon className='absolute top-1.5 left-3'/>
    </div>
  )
}

export default WarningPanel
