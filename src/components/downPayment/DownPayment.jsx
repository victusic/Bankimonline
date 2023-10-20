import React, { useEffect, useMemo, useState } from 'react'
import { MainInput } from '../../ui/inputs/mainInput/mainInput'
import ComponentTitle from '../../ui/titles/componentTitle/ComponentTitle'
import { InputsPlateLayout } from '../../layouts/inputsPlateLayout/InputsPlateLayout';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../../store/mortgageCalculationSlice';
import WarningPanel from '../../ui/panels/warningPanel/WarningPanel';
import InfoIcon from '../../assets/icons/infoIcon/InfoIcon';
import InfoHint from '../../ui/panels/infoHint/InfoHint';
import { useFormikContext } from 'formik';
import ErrorPanel from '../../ui/panels/errorPanel/ErrorPanel';
import numeral from 'numeral';

const DownPayment = () => {
  const { errors, touched } = useFormikContext();
  const dispatch = useDispatch();

  const formData = useSelector(state => state.calcMortgage.formData);

  const priceEstate = formData.priceEstate;
  const price = formData.downPayment;

  const percentages = formData.percentages;

  const [payment, setPayment] = useState(price);

  const percentageThresholdValue = formData.percentageThreshold;
  const percentageThreshold = parseInt((priceEstate * percentageThresholdValue)/100);

  const setPrice = (newPrice) => {
    const updatedFormData = { ...formData, downPayment: newPrice };
    dispatch(setFormData(updatedFormData));
  };

  useEffect(()=>{
    const newPrice = (percentages*priceEstate)/100
    setPayment(newPrice)
  }, [priceEstate])

  //фиксация в redux
  useEffect(()=>{
    const updatedFormData = { ...formData, downPayment: payment };
    dispatch(setFormData(updatedFormData))
  }, [payment])
  

  //процент финансирования
  const financingAmount = priceEstate - payment;
  //const financingPercentage = parseInt(((priceEstate - price) / priceEstate) * 100);
  const financingPercentage =(((priceEstate - payment) / priceEstate) * 100).toFixed(1);

  const handlePaymentChange = (newValue) => {
    setPayment(newValue);
    //подсчёт нового процентного соотношения
    const updatedFormData = { ...formData, percentages: parseInt((newValue*100)/priceEstate) };
    dispatch(setFormData(updatedFormData));
  };

  //сброс взноса при уменьшеннии лимита
  useEffect(()=>{
    const currentInterest = (price*100)/percentageThreshold;

    if(currentInterest > percentageThresholdValue){
      setPrice(0)
    }
  }, [percentageThresholdValue])

  //подсказка
  const [isHoveredInfo, setIsHoveredInfo] = useState(false);

  return (
    <InputsPlateLayout>
      <ComponentTitle>
      <span className="flex items-center">
        Первоначальный взнос 
        <InfoIcon className="w-5 ml-1 cursor-pointer mt-1" 
          onMouseEnter={()=>setIsHoveredInfo(true)}
          onMouseLeave={()=>setIsHoveredInfo(false)}
          onClick={()=>setIsHoveredInfo(!isHoveredInfo)}
          />
      </span>
      </ComponentTitle>

      <InfoHint visible={isHoveredInfo}>
        Основная квартира: у заемщика нет квартиры ставка финансирования<br/>
        <span className='font-medium'>Максимум до 75%</span>
        <br/><br/>
        Альтернативная квартира: Для заемщика квартира, которую он обязуется продать в течение двух лет ставка финансирования<br/>
        <span className='font-medium'>Максимум до 70%</span>
        <br/><br/>
        Вторая квартира или выше: у заемщика уже есть ставка финансирования квартиры <br/>
        <span className='font-medium'>Максимум до 50%</span>
      </InfoHint>

      <MainInput
        viewSheikel={true}
        viewRange={true}
        minValue={0}
        maxValue={percentageThreshold}
        step={1000}
        value={payment}
        setValue={handlePaymentChange}
        error={errors.percentages}
        touched={touched.percentages}
      />
      <WarningPanel>
        Сумма Финансирования: <strong>{numeral(financingAmount).format("0,0")}</strong><span className='text-xs'>₪</span><br />
        Процент финансирования: <strong>{financingPercentage}%</strong>
      </WarningPanel>
      {errors.percentages && touched.percentages ? (
          <ErrorPanel>{errors.percentages}</ErrorPanel>
      ) : null}
    </InputsPlateLayout>
  );
};

export default DownPayment;