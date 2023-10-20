import React from 'react'
import { MainInput } from '../../ui/inputs/mainInput/mainInput'
import ComponentTitle from '../../ui/titles/componentTitle/ComponentTitle'
import { InputsPlateLayout } from '../../layouts/inputsPlateLayout/InputsPlateLayout';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData  } from '../../store/mortgageCalculationSlice'
import ErrorPanel from '../../ui/panels/errorPanel/ErrorPanel';
import { useFormikContext } from 'formik';

export const PriceEstate = () => {

  const { errors, touched } = useFormikContext();

  const dispatch = useDispatch();

  const price = useSelector(state => state.calcMortgage.formData.priceEstate);

  const formData = useSelector(state => state.calcMortgage.formData);

  const setPrice = (newPrice) => {
    const updatedFormData = { ...formData, priceEstate: newPrice };
    dispatch(setFormData(updatedFormData));
  };

  return (
    <InputsPlateLayout>
        <ComponentTitle>Стоимость недвижимости</ComponentTitle>
        <MainInput 
          viewSheikel={true} 
          minValue={1000} 
          maxValue={100000000} 
          value={price} 
          setValue={setPrice}
          formName='priceEstate'
          error={errors.priceEstate}
          touched={touched.priceEstate}
        />
        {errors.priceEstate && touched.priceEstate ? (
            <ErrorPanel>{errors.priceEstate}</ErrorPanel>
        ) : null}
    </InputsPlateLayout>
  )
}