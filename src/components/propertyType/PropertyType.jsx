import React from 'react'
import ComponentTitle from '../../ui/titles/componentTitle/ComponentTitle'
import propertyTypes from '../../data/propertyTypes.json'
import { Select } from '../../ui/select/select/Select'
import { InputsPlateLayout } from '../../layouts/inputsPlateLayout/InputsPlateLayout';
import { setFormData } from '../../store/mortgageCalculationSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import ErrorPanel from '../../ui/panels/errorPanel/ErrorPanel';

const PropertyType = () => {
  const { errors, touched } = useFormikContext();
  const dispatch = useDispatch();

  const formData = useSelector(state => state.calcMortgage.formData);

  const selectedOption = formData.propertyType

  const setSelectedOption = (selOption) => {
    const updatedFormData = { ...formData, propertyType: selOption.id };
    dispatch(setFormData(updatedFormData));
  };

  return (
    <InputsPlateLayout>
        <ComponentTitle>Тип недвижимости</ComponentTitle>
        <Select 
          placeholder='Выберите тип недвижимости' 
          options={propertyTypes} 
          selectedOption={selectedOption} 
          setSelectedOption={setSelectedOption}
          error={errors.propertyType}
          touched={touched.propertyType}
        />
        {errors.propertyType && touched.propertyType ? (
            <ErrorPanel>{errors.propertyType}</ErrorPanel>
        ) : null}
    </InputsPlateLayout>
  )
}

export default PropertyType
