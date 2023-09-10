import React, { useContext,useState, useEffect, useRef } from 'react';
import { Categories } from "../Components/Categories/Categories";
import { Sort, list } from "../Components/Sort/Sort";
import { PizzaBlock } from "../Components/PizzaBlock/PizzaBlock";
import {Skeleton} from "../Components/PizzaBlock/Skeleton";
import { Pagination } from '../Components/Pagination/Pagination';
import qs from 'qs';
import { SearchContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { useDispatch, useSelector} from 'react-redux';


export const Home = () => {
  const navigate = useNavigate();
  const {categoryId, sort, currentPage} = useSelector(state=> state.filter);
  const status= useSelector(state=> state.pizza.status);
  const items = useSelector(state=> state.pizza.items.data);
  const dispatch = useDispatch();
  const {searchValue} = useContext(SearchContext);
  const sortType = sort.sortProperty;
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  
  const onChangePage = (number) =>{
    dispatch(setCurrentPage(number))
  }

  useEffect(()=>{
    if(window.location.search){
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find(obj => obj.sortProperty === params.sortProperty)
      dispatch(
        setFilters({
          ...params,
          sort,
        }))
        isSearch.current = true;
    }
  }, [])

  const getPizzas = async () => {
    
    
    const order = sortType.includes('-')?'asc':'desc';
    const sortBy = sortType.replace('-','')
    const category = categoryId > 0 ? `category=${categoryId}`: '';
    const search = searchValue ? `&search=${searchValue}`: '';

    dispatch(fetchPizzas({
      order,
      sortBy,
      category,
      search,
      currentPage
    }));
  
  };

  useEffect(() => {
    if(!isSearch.current){
      getPizzas();
      isSearch.current = false;
    }
    window.scrollTo(0,0);
  }, [categoryId, sortType, searchValue, currentPage]);


  useEffect(()=>{
    
    if(isMounted.current){  
      const queryString  = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`)
    }
    getPizzas();
    isMounted.current = true;
    
  },[categoryId, sort.sortProperty, searchValue, currentPage])

  const pizzas = items.map(item=> (
    <PizzaBlock key={item.id}{...item}/>
  ));
  const skeletons = [...new Array(6)].map((_,index)=>(<Skeleton key={index}/>))
  return (

    <div className="container">
    <div className="content__top">
            <Categories value={categoryId}/>
            <Sort/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {status==='loading'?skeletons:pizzas}
          </div>
          <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>

    
  );
};

