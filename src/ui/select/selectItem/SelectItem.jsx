import React from 'react'

const SelectItem = ({children, ...props}) => {
  return (
    <li className='cursor-poInter flex justify-between select-none py-2.5 px-4 hover:bg-baseSecondaryHover text-sm' {...props}>
        {children}
    </li>
  )
}

export default SelectItem
