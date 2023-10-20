import React from 'react'
import DecorateLine from '../../ui/decorate/decorateLine/DecorateLine'
import SendButton from '../../ui/buttons/sendButton/SendButton'

const ContinuePlate = () => {
  return (
    <div className='flex flex-col mob:bg-baseSecondary tab:bg-background'>
      <DecorateLine/>
      <div className='mt-1.5 flex justify-center mob:mx-5 tab:mx-15 '>
        <div className='flex tab:justify-end mob:justify-center max-w-1130 w-full'>
            <SendButton>Продолжить</SendButton>
        </div>
      </div>
    </div>
    
  )
}

export default ContinuePlate
