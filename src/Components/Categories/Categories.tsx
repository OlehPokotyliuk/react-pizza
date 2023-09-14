import React, {memo} from 'react';
import { useDispatch } from 'react-redux';
import { setCategoryId } from '../../redux/filter/slice';

type CategoriesProps = {
  value: number,
} 
const categories:string[] = ["Все","Мясные","Вегетарианская", "Гриль","Острые","Закрытые",
]
export const Categories:React.FC<CategoriesProps> = memo(({value}) => {
  const dispatch = useDispatch();
  return (
    <div className="categories">
      <ul>
        {categories.map((item,index)=>(
            <li key={index} className={value===index?'active':''} onClick={()=>dispatch(setCategoryId(index))}>{item}</li>    
          ))}
      </ul>
    </div>
  );
})
