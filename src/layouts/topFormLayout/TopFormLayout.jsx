import React from 'react'

export const TopFormLayout = ({children}) => {
  return (
    <div className='w-full flex justify-center mob:px-5 tab:px-15 mob:pt-30 mb-1.5'>
      <div className='flex flex-col  max-w-1130'>
        {children}
      </div>
    </div>
    
  )
}
