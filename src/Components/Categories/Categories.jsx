import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../store/filterSlice';


export const Categories = ({value, onClickCategory}) => {
  const dispatch = useDispatch();
  
  const categories = ["Все","Мясные","Вегетарианская", "Гриль","Острые","Закрытые",
  ]
  return (
    <div className="categories">
      <ul>
        {categories.map((item,index)=>(
            <li key={index} className={value===index?'active':''} onClick={()=>dispatch(setCategory(index))}>{item}</li>    
          ))}
      </ul>
    </div>
  );
};

{/* <li key={index} className={value===index?'active':''} onClick={()=>onClickCategory(index)}>{item}</li>     */}