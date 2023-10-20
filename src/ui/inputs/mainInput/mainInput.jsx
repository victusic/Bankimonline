import React, { useEffect, useRef } from 'react'
import { Sheikel } from '../../../assets/icons/sheikel/Sheikel';
import numeral from 'numeral';
import { Field } from 'formik';

export const MainInput = ({ 
  viewSheikel = false, 
  viewRange = false, 
  minValue, 
  maxValue, 
  value, 
  setValue, 
  step=null, 
  formName, 
  error, 
  touched,
  ...props
}) => {
  
  //price содержит итоговое число, форматирование происходит напрямую
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = numeral(inputValue.replace(/\D/g, "")).value();
    setValue(numericValue);
  };

  //управление ползунком
  const handleRangeChange = (e) => {
    const numericValue = parseInt(e.target.value, 10);
    setValue(numericValue);
  };

  //желтая полоска на range
  useEffect(() => {
    if (progressRef.current) {
      const filling = ((value - minValue) / (maxValue - minValue)) * 100;
      progressRef.current.style.background = `linear-gradient(to right, #FBE54D 0%, #FBE54D ${filling}%, #fff ${filling}%, white 100%)`;
    }
  }, [value, minValue, maxValue]);

  const progressRef = useRef(null);

  return (
    <div className='relative'>
      <Field 
        type="text"
        value={numeral(value).format("0,0")}
        onChange={handleInputChange}
        className={`pl-6 pr-14 py-3 w-full h-12 rounded-6 pointer-events-all ring-1 ${error && touched ? 'ring-errorBackgroung' : 'ring-baseStroke'} text-textPrimary bg-baseInputs text-xl font-Inter`}
        name={formName}
        {...props}
      ></Field>

      {viewSheikel ? <Sheikel className="absolute top-4 right-6 h-5" /> : null}

      {viewRange ? (
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={value}
          step={step}
          ref={progressRef}
          className="absolute bottom-0 left-0 w-full h-0.5 cursor-pointer"
          onChange={handleRangeChange}
        />
      ) : null}
      <style>
        {`
            input[type="range"] {
              border-radius: 8px;
              height: 2px;
              width: 100%;
              outline: none;
              -webkit-appearance: none;
            }
            
            input[type="range"]::-webkit-slider-thumb {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              -webkit-appearance: none;
              cursor: ew-resize;
              background: #FBE54D;
            }
        `}
        </style>
    </div>
  );
};

