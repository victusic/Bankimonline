import React from 'react'
import Rectangle from '../../../assets/icons/rectangle/Rectangle'

const InfoHint = ({visible, children}) => {
  return (
    <div className={`absolute bg-baseInfo z-30 px-2 py-1 rounded ${!visible ? 'hidden' : null} 
        tab:w-64 tab:left-176
        mob:w-10/12 mob:left-0
        `}>
        <Rectangle className='absolute -top-1.5 tab:left-1.5 mob:left-184'/>
        <p className='text-sm font-Inter text-textPrimary'>
            {children}
        </p>
    </div>
  )
}

export default InfoHint
