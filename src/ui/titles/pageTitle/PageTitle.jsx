import React from 'react'

const PageTitle = ({children}) => {
  return (
    <h1 className='text-textPrimary cursor-default font-roboto mb-8 mob:text-3xl tab:text-5xl'>{children}</h1>
  )
}

export default PageTitle
