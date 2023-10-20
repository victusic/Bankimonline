import React from 'react'
import { PriceEstate } from '../../components/priceEstate/PriceEstate';
import PurchaseCity from '../../components/purchaseCity/PurchaseCity';
import WhenRegister from '../../components/whenRegister/WhenRegister';
import DownPayment from '../../components/downPayment/DownPayment'
import PropertyType from '../../components/propertyType/PropertyType'
import RealEstate from '../../components/realEstate/RealEstate';
import Term from '../../components/term/Term';
import MonthlyPayment from '../../components/monthlyPayment/MonthlyPayment';
import DecorateLine from '../../ui/decorate/decorateLine/DecorateLine';

const СreditСalculationPlate = () => {
  
  return (
    <div className='flex flex-wrap max-w-1130'>
      <div className='flex flex-wrap w-full lap:justify-between'>
        <PriceEstate/>
        <PurchaseCity/>
        <WhenRegister/>
      </div>
      <div className='flex flex-wrap w-full lap:justify-between'>
        <DownPayment/>
        <PropertyType/>
        <RealEstate/>
      </div>
      <DecorateLine/>
      <div className='flex flex-wrap w-full lap:justify-between'>
        <Term/>
        <MonthlyPayment/> 
        <div className=' mob:w-full tab:w-325 '/>
      </div>
    </div>
  )
}

export default СreditСalculationPlate
