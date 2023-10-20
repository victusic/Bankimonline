import React from 'react'
import { Select } from '../../ui/select/select/Select'
import periods from '../../data/periods.json'
import ComponentTitle from '../../ui/titles/componentTitle/ComponentTitle';
import { InputsPlateLayout } from '../../layouts/inputsPlateLayout/InputsPlateLayout';
import { setFormData } from '../../store/mortgageCalculationSlice'
import { useDispatch, useSelector } from 'react-redux';
import ErrorPanel from '../../ui/panels/errorPanel/ErrorPanel';
import { useFormikContext } from 'formik';

const WhenRegister = () => {
  const { errors, touched } = useFormikContext();
  const dispatch = useDispatch();
  
  const formData = useSelector(state => state.calcMortgage.formData);

  const selectedOption = formData.whenRegister

  const setSelectedOption = (selOption) => {
    const updatedFormData = { ...formData, whenRegister: selOption.id };
    dispatch(setFormData(updatedFormData));
  };

  return (
    <InputsPlateLayout>
        <ComponentTitle>Когда вы планируете оформить ипотеку?</ComponentTitle>
        <Select 
          placeholder='Выберите период' 
          options={periods}  
          selectedOption={selectedOption} 
          setSelectedOption={setSelectedOption}
          error={errors.whenRegister}
          touched={touched.whenRegister}
        />
        {errors.whenRegister && touched.whenRegister ? (
            <ErrorPanel>{errors.whenRegister}</ErrorPanel>
        ) : null}
    </InputsPlateLayout>
  )
}

export default WhenRegister
