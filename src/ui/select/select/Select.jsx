import React, { useState, useRef, useEffect, useMemo } from 'react'
import { SelectArrow } from '../../../assets/icons/selectArrow/SelectArrow';
import { FindInput } from '../../inputs/findInput/FindInput';
import { CheckIcon } from '../../../assets/icons/checkIcon/CheckIcon';
import SelectItem from '../selectItem/SelectItem';

export const Select = ({
  placeholder, 
  options, 
  find=false, 
  selectedOption, 
  setSelectedOption,
  error, 
  touched
}) => {

    const selectRef = useRef(null);
    
    const [isOpen, setIsOpen] = useState(false);

    const [findText, setFindText] = useState()
    const [sortOptions, setSortOptions] = useState(options);

    const [textOption, setTextOption] = useState('');

    //закрытие списка при нажатии на страницу
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);


    //поиск вариантов в списке
    useMemo(()=>{
        setSortOptions('');
        if(findText){
            const foundItems = options.filter((item) => item.value.toLowerCase().includes(findText.toLowerCase()));
            setSortOptions(foundItems);
        }
        else{
            setSortOptions(options);
        }
    }, [findText])

    //выбор элемента
    const setOption = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    //текст выбранного option
    useMemo(()=>{
      const findTextItem = options.find(option => option.id == selectedOption)
      if(findTextItem){
        setTextOption(findTextItem.value)
      }
    }, [selectedOption])

    //открытие и закрытие с блоком поведения формы
    const handleButtonClick = (e) => {
      e.preventDefault();
      setIsOpen(!isOpen);
    };

  return (
      <div ref={selectRef} className='relative w-full'>
        <button onClick={handleButtonClick} 
          className={`flex w-full h-12 items-center justify-between rounded bg-baseInputs px-6 ring-1 
            ${error && touched ? 'ring-errorBackgroung' : 'ring-baseStroke'} transition-colors ${isOpen ? "ring-primary" : null}`}
        >
            <p className='text-base truncate text-textPrimary font-roboto mob:max-w-200 mmob:max-w-250 bmob:max-w-300'>
                {textOption ? <span>{textOption}</span> : <span className='text-textDisabled font-Inter'>{placeholder}</span>}
            </p>

            <SelectArrow className={`min-w-min h-2.5 transition-transform ml-2.5 ${isOpen ? 'rotate-180' : 'rotate-0'}`}/>
        </button>

        {isOpen && (
          <div className='z-10 py-2 absolute mt-2 w-full rounded bg-baseSecondary ring-1 ring-baseStroke text-textPrimary '>
            <ul className={`overflow-y-auto scrollbar-thin scrollbar-thumb-baseBarColor scrollbar-rounded mr-px ${find ? 'max-h-43' : 'max-h-40'}`}>
                {find ? <FindInput findText={findText} setFindText={setFindText}/>: null}
                {sortOptions.length > 0 ? (
                  sortOptions.map((option) => (
                    <SelectItem key={option.id} onClick={() => setOption(option)}>
                      {option.value}
                      {selectedOption === option.id ? <CheckIcon /> : null}
                    </SelectItem>
                  ))
                ) : (
                  <p className='text-sm flex justify-center py-2.5 cursor-default'>Ничего не найдено</p>
                )}
            </ul>
          </div>
        )}
        
      </div>
  );
}
