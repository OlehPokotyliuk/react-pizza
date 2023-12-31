import React, { useEffect, useRef } from 'react';
import { Categories, SortPopup, PizzaBlock,  Skeleton, Pagination } from '../Components'; 
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { useAppDispatch } from '../redux/store.ts';
import { selectPizzaData } from '../redux/pizza/selectors';
import { selectFilter } from '../redux/filter/selectors';
import { setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';


const Home:React.FC = () => {
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


  const pizzas = items.map((item:any)=> (
      <PizzaBlock {...item} key={item.id}/>
  ));
  const skeletons = [...new Array(6)].map((_,index)=>(<Skeleton key={index}/>))
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

export default Home