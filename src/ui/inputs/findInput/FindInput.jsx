import React from 'react'
import MagnifyIcon from '../../../assets/icons/magnifyIcon/MagnifyIcon';

export const FindInput = ({findText, setFindText, props}) => {
     
  return (
    <div className='py-2 px-3 relative'>
        <input type='text' value={findText} onChange={e => setFindText(e.target.value)}
            className='w-full h-9 pr-2 pl-11 py-2 rounded-5 pointer-events-all ring-1 ring-baseStroke text-textDisabled bg-baseInputs text-sm'  
            placeholder='Поиск' {...props}
        ></input>
        <MagnifyIcon className='absolute top-4 left-7 h-5'/>
    </div>
  )
}
