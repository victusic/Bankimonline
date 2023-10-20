import { Form, Formik } from 'formik';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useSubmitFormDataMutation } from '../../api/formMutation'
import numeral from 'numeral';

const getPayment = (priceEstate, downPayment, term, interestRate) => {
  //годовая ставка/12
  const monthlyRate = interestRate/12/100;

  //кол-во платежей
  const numberPayments = term*12;  

  //аннуитентный платёж
  const annuitantPayment = (monthlyRate*((1+monthlyRate)**numberPayments))/(((1+monthlyRate)**numberPayments)-1)

 return Math.ceil((priceEstate-downPayment)*annuitantPayment);
}

const getSignupSchema = (minPayment, maxPayment, percentageThreshold) => {
  return Yup.object().shape({
    priceEstate: Yup.number()
      .min(10000, 'Минимальное значение 10,000')
      .max(10000000, 'Максимальное значение 10,000,000')
      .required('Укажите стоимость'),

      purchaseCity: Yup.number()
      .required('Выберите ответ'),

      whenRegister: Yup.number()
      .required('Выберите ответ'),

      propertyType: Yup.number()
      .required('Выберите ответ'),

      realEstate: Yup.number()
      .required('Выберите ответ'),

      term: Yup.number()
      .min(4, 'Срок ипотеки не может быть меньше 4 лет')
      .max(30, 'Срок ипотеки не может превышать 30 лет')
      .required('Укажите срок ипотеки'),

      monthlyPayment: Yup.number()
      .min(minPayment, `Размер ежемесячного платежа не может быть меньше ${numeral(minPayment).format("0,0")} иначе срок будет больше 30 лет`)
      .max(maxPayment, `Размер ежемесячного платежа не может быть больше ${numeral(maxPayment).format("0,0")} `)
      .required('Укажите размер ежемесячного платежа'),

      percentages: Yup.number()
      .min(25, `Сумма первоначального взноса не может быть меньше 25% от стоимости недвижимости`)
      .max(percentageThreshold, `Сумма первоначального взноса не может быть больше ${percentageThreshold}% от стоимости недвижимости при выбранном наличии у вас жилья `)
      
  });
};

const MortgageСalculationForm = ({children}) => {

  const initialValues = useSelector(state => state.calcMortgage.formData);

  //при возможности перенести в store для оптимизации

  const {priceEstate, downPayment, interestRate, percentageThreshold} = initialValues;

  //минимальный/максимально платёж
  const minPayment = getPayment(priceEstate, downPayment, 30, interestRate);
  const maxPayment = getPayment(priceEstate, downPayment, 4, interestRate);

  //отправка и сохранение
  const [submitFormData] = useSubmitFormDataMutation();

  const handleSubmit = async (values) => {
    try {
      const result = await submitFormData(values);
      localStorage.setItem('formData', JSON.stringify(values));
  
    } catch (error) {
      console.error('Ошибка:', error);
    } finally{
      //пример работы
      const storedData = JSON.parse(localStorage.getItem('formData'));
      console.log(storedData);
    }
  };

  //модель валидации
  const validationSchema = getSignupSchema(minPayment, maxPayment, percentageThreshold);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur 
      enableReinitialize={true}
      onSubmit={handleSubmit}
    >
      <Form>
        {children}
      </Form>
          
    </Formik>
  );
}

export default MortgageСalculationForm
