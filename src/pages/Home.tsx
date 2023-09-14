import React, { useEffect, useRef } from 'react';
import { Categories } from "../Components/Categories/Categories";
import { SortPopup, list } from "../Components/Sort/SortPopup";
import { PizzaBlock } from "../Components/PizzaBlock/PizzaBlock";
import {Skeleton} from "../Components/PizzaBlock/Skeleton";
import { Pagination } from '../Components/Pagination/Pagination';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { useAppDispatch } from '../redux/store.ts';
import { selectPizzaData } from '../redux/pizza/selectors';
import { selectFilter } from '../redux/filter/selectors';
import { setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';


export const Home:React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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

  // useEffect(()=>{
  //   if(window.location.search){
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = list.find(obj => obj.sortProperty === params.sortBy)
      
  //     dispatch(setFilters({
  //       searchValue: params.search,
  //       categoryId: Number(params.category),
  //       currentPage: Number(params.currentPage),
  //       sort: sort || list[0],
  //     }))
  //       isSearch.current = true;
  //   }
  // }, [])

  const getPizzas = async () => {
    
    
    const order = sortType.includes('-')?'asc':'desc';
    const sortBy = sortType.replace('-','')
    const category = categoryId > 0 ? `category=${categoryId}`: '';
    const search = searchValue ? `&search=${searchValue}`: '';

    dispatch(
      fetchPizzas({
      order,
      sortBy,
      category,
      search,
      currentPage: String(currentPage),
    }));
  
  };

  useEffect(() => {
      getPizzas();

  }, [categoryId, sortType, searchValue, currentPage]);


  // useEffect(()=>{
    
  //   if(isMounted.current){  
  //     const queryString  = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`)
  //   }
  //   getPizzas();
  //   isMounted.current = true;
    
  // },[categoryId, sort.sortProperty, searchValue, currentPage])

  const pizzas = items.map((item:any)=> (
      <PizzaBlock {...item} key={item.id}/>
  ));
  const skeletons = [...new Array(6)].map((_,index)=>(<Skeleton key={index}/>))
  console.log(categoryId);
  return (

    <div className="container">
    <div className="content__top">
            <Categories value={categoryId}/>
            <SortPopup value={sort}/>
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

