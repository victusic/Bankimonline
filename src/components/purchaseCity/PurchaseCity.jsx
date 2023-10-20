import React from 'react'
import { Select } from '../../ui/select/select/Select'
import tows from '../../data/towns.json'
import ComponentTitle from '../../ui/titles/componentTitle/ComponentTitle';
import { InputsPlateLayout } from '../../layouts/inputsPlateLayout/InputsPlateLayout';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../../store/mortgageCalculationSlice'
import { useFormikContext } from 'formik';
import ErrorPanel from '../../ui/panels/errorPanel/ErrorPanel';

const PurchaseCity = () => {
  const { errors, touched } = useFormikContext();
  const dispatch = useDispatch();

  const formData = useSelector(state => state.calcMortgage.formData);

  const selectedOption = formData.purchaseCity

  const setSelectedOption = (selOption) => {
    const updatedFormData = { ...formData, purchaseCity: selOption.id };
    dispatch(setFormData(updatedFormData));
  };

  return (
    <InputsPlateLayout>
        <ComponentTitle>Город покупки недвижимости</ComponentTitle>
        <Select 
          placeholder='Выберите город' 
          options={tows} 
          find={true} 
          selectedOption={selectedOption} 
          setSelectedOption={setSelectedOption}
          error={errors.purchaseCity}
          touched={touched.purchaseCity}
        />
        {errors.purchaseCity && touched.purchaseCity ? (
            <ErrorPanel>{errors.purchaseCity}</ErrorPanel>
        ) : null}
    </InputsPlateLayout>
  )
}

export default PurchaseCity
