import React from 'react'

const InfoPlate = ({fValue, sValue}) => {
  return (
    <div className='flex justify-between mt-2 w-full font-Inter text-sm text-textPrimary'>
      <p>{fValue}</p>
      <p>{sValue}</p>
    </div>
  )
}

export default InfoPlate
