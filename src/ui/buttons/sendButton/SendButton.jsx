import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


const SendButton = ({children, props}) => {

  //const { isValid } = useFormikContext();

  const [buttonState, setButtonState] = useState(false)

  const formData = useSelector(state => state.calcMortgage.formData);

  //сканировае на пустоту, для блокировки кнопки
  const checkFormFilled = () => {
    const values = Object.values(formData);
    return values.every(value => value !== null && value !== '');
  };

  useEffect(() => {
    const filled = checkFormFilled();
    setButtonState(filled);
  }, [formData]);

  return (
    <button type="submit" disabled={!buttonState} className='py-3 px-74 mb-8 font-Inter text-base cursor-pointer bg-primary hover:text-background h-fit rounded-lg
    hover:bg-textPrimary
    disabled:bg-baseDisabled disabled:text-textDisabled
    ' {...props}>
      {children}
    </button>
  )
}

export default SendButton
