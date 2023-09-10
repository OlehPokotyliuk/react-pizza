import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { setCategoryId } from '../../redux/slices/filterSlice';


export const Categories = ({value}) => {
  const dispatch = useDispatch();
  
  const categories = ["Все","Мясные","Вегетарианская", "Гриль","Острые","Закрытые",
  ]
  return (
    <div className="categories">
      <ul>
        {categories.map((item,index)=>(
            <li key={index} className={value===index?'active':''} onClick={()=>dispatch(setCategoryId(index))}>{item}</li>    
          ))}
      </ul>
    </div>
  );
};

