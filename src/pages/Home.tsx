import React, { useContext,useState, useEffect, useRef } from 'react';
import { Categories } from "../Components/Categories/Categories.tsx";
import { Sort, list } from "../Components/Sort/Sort.tsx";
import { PizzaBlock } from "../Components/PizzaBlock/PizzaBlock.tsx";
import {Skeleton} from "../Components/PizzaBlock/Skeleton.tsx";
import { Pagination } from '../Components/Pagination/Pagination.tsx';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';
import { selectFilter, setCurrentPage, setFilters} from '../redux/slices/filterSlice.ts';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice.ts';
import { useDispatch, useSelector} from 'react-redux';


export const Home:React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // useSelector section
  const {items, status} = useSelector(selectPizzaData);
  const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);
  const sortType = sort.sortProperty;
  // useRef section
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  
  const onChangePage = (number:number) =>{
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

    dispatch(
      //@ts-ignore
      fetchPizzas({
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

  const pizzas = items.map((item:any)=> (
    <Link to={`pizza/${item.id}`} key={item.id}><PizzaBlock {...item}/></Link>
  ));
  const skeletons = [...new Array(6)].map((_,index)=>(<Skeleton key={index}/>))
  return (

    <div className="container">
    <div className="content__top">
            <Categories value={categoryId}/>
            <Sort/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          {
            status === 'error' ? <div className="content__error-info">
              <h2>😅 Произошла ошибка</h2>
              <p className="">К сожалению, не удалось получить пиццы.
              Попробуйте повторить попытку позже.</p>
            </div>:
            (<div className="content__items">{status==='loading'?skeletons:pizzas}</div>)
          }
          
          <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>

    
  );
};

