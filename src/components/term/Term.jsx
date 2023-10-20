import React, { useMemo } from 'react'
import ComponentTitle from '../../ui/titles/componentTitle/ComponentTitle'
import { MainInput } from '../../ui/inputs/mainInput/mainInput'
import { InputsPlateLayout } from '../../layouts/inputsPlateLayout/InputsPlateLayout';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../../store/mortgageCalculationSlice';
import InfoPlate from '../../ui/panels/infoPlate/InfoPlate';
import { useFormikContext } from 'formik';
import ErrorPanel from '../../ui/panels/errorPanel/ErrorPanel';

const Term = () => {
  const { errors, touched } = useFormikContext();
  const dispatch = useDispatch();

  const formData = useSelector(state => state.calcMortgage.formData);

  const price = formData.term;

  const setTerm = (term) => {
    const updatedFormData = { ...formData, term: term };
    dispatch(setFormData(updatedFormData));
  };

  // Данные для расчета сроков
  const { priceEstate, downPayment, interestRate, monthlyPayment } = formData;

  // Рассчет сроков платежа
  useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    const p = priceEstate - downPayment;
    const n = Math.log(monthlyPayment / (monthlyPayment - p * monthlyRate)) / Math.log(1 + monthlyRate);
    
    const finalYears = Math.ceil(n/12);

    {finalYears > 3 && finalYears < 31 ? (setTerm(finalYears)) : (setTerm(30))}

  }, [priceEstate, downPayment, monthlyPayment]);

  return (
    <InputsPlateLayout>
      <ComponentTitle>Срок</ComponentTitle>
      <MainInput 
        viewRange={true} 
        minValue={4} 
        maxValue={30}
        value={price} 
        setValue={setTerm}
        error={errors.term}
        touched={touched.term}
      />
      <InfoPlate fValue={'4 года'} sValue={'30 лет'}/>

      {errors.term && touched.term ? (
          <ErrorPanel>{errors.term}</ErrorPanel>
       ) : null}
    </InputsPlateLayout>
  )
}

export default Term
