import React from 'react'

const Rectangle = ({...props}) => {
  return (
    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" {...props}>
        <path d="M8 6H0L4 0L8 6Z" fill="#41434E"/>
    </svg>
  )
}

export default Rectangle
