import React from 'react'
import { Select } from '../../ui/select/select/Select'
import realEstate from '../../data/realEstate.json'
import ComponentTitle from '../../ui/titles/componentTitle/ComponentTitle'
import { InputsPlateLayout } from '../../layouts/inputsPlateLayout/InputsPlateLayout';
import { setFormData } from '../../store/mortgageCalculationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import ErrorPanel from '../../ui/panels/errorPanel/ErrorPanel';

const RealEstate = () => {
  const { errors, touched } = useFormikContext();
  const dispatch = useDispatch();

  const formData = useSelector(state => state.calcMortgage.formData);

  const selectedOption = formData.realEstate

  const setSelectedOption = (selOption) => {
    //обновление значение и лимита на первый взнос
    const updatedFormData = { ...formData, realEstate: selOption.id, percentageThreshold: selOption.contributionLimit};
    dispatch(setFormData(updatedFormData));
  };
  
  return (
    <InputsPlateLayout>
      <ComponentTitle>Вы уже владеете недвижимостью?</ComponentTitle>
      <Select 
        placeholder='Выберите ответ' 
        options={realEstate} 
        selectedOption={selectedOption} 
        setSelectedOption={setSelectedOption}
        error={errors.realEstate}
        touched={touched.realEstate}
      />
      {errors.realEstate && touched.realEstate ? (
          <ErrorPanel>{errors.realEstate}</ErrorPanel>
       ) : null}
    </InputsPlateLayout>
  )
}

export default RealEstate
