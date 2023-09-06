import React, { useContext } from 'react';
import { Categories } from "../Components/Categories/Categories";
import { Sort } from "../Components/Sort/Sort";
import { PizzaBlock } from "../Components/PizzaBlock/PizzaBlock";
import { useState, useEffect } from "react";
import {Skeleton} from "../Components/PizzaBlock/Skeleton";
import { Pagination } from '../Components/Pagination/Pagination';
import { AppContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import  {addFilter}  from '../store/filterSlice';


export const Home = () => {
  const dispatch = useDispatch();
  
  const {searchValue} = useContext(AppContext);
  let [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const[sortType, setSortType] = useState({name: 'популярности', sort: 'rating'});
  const[currentPage, setCurrentPage] = useState(1)
  const order = sortType.sort.includes('-')?'asc':'desc';
  const sortBy = sortType.sort.replace('-','')
  const category = categoryId > 0 ? `category=${categoryId}`: '';
  const search = searchValue ? `&search=${searchValue}`: '';
  dispatch(addFilter(order));
  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://64f093088a8b66ecf779e060.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}${search}`);
      const data = await response.json();
        setItems(data);
        setIsLoading(false);
      
      
    } catch (error) {
      console.error('Ошибка при загрузке данных', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    window.scrollTo(0,0);
  }, [categoryId, sortType, searchValue, currentPage]);
  const pizzas = items.map(item=> (
    <PizzaBlock key={item.id}{...item}/>
  ));
  const skeletons = [...new Array(6)].map((_,index)=>(<Skeleton key={index}/>))
  return (

    <div className="container">
    <div className="content__top">
            <Categories value={categoryId} onClickCategory={(index)=>setCategoryId(index)}/>
            <Sort value={sortType} onClickSort={(ind)=>setSortType(ind)}/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
            ?skeletons
            :pizzas}
          </div>
          <Pagination onChangePage={(num)=>setCurrentPage(num)}/>
    </div>

    
  );
};

