import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import classes from './Search.module.scss';
import { setSearchValue } from '../../redux/slices/filterSlice';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';



export const Search:React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  


  const onClickClear = () =>{
    dispatch(setSearchValue(''));
    setValue('')
    inputRef.current?.focus();
  } 

  const updateSearchValue = useCallback(
    debounce((str:string)=>{
      dispatch(setSearchValue(str));
    },1000),
    [],
  )
  const onChangeInput = e =>{
    setValue(e.target.value);
    updateSearchValue(e.target.value)
  }
  return (
    <div className={classes.main}>
      <svg 
        className={classes.icon} 
        height="24" viewBox="0 0 24 24" >
        <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"/></svg>
      <input 
        ref={inputRef}
        className={classes.input} 
        placeholder='поиск пиццы' 
        value={value} 
        onChange={(e)=>onChangeInput(e)}
      />
      {value&&
      <svg onClick={onClickClear} className={classes.clearIcon}><g><path d="M0 0h24v24H0z" fill="none"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"/></g></svg>
      }
      
    </div>
  );
};

