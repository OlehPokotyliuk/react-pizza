import { createSlice } from "@reduxjs/toolkit"
import { Rootstate } from "../store";
type Sort = {
  name: string, 
  sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price' ;
}

interface FilterSliceState {
  searchValue:string,
  categoryId:number,
  currentPage: number,
  sort: Sort,
}

const initialState:FilterSliceState={
  searchValue:'',
  categoryId:0,
  currentPage: 1,
  sort: {name: 'популярности', sortProperty: 'rating'},

}

const filterSlice = createSlice({
  name:'filters',
  initialState,
  reducers:{
    setCategoryId(state,action){
      state.categoryId = action.payload;
    },
    setSearchValue(state,action){
      state.searchValue = action.payload;
    },
    setSort(state,action){
      state.sort = action.payload;
    },
    setCurrentPage(state,action){
      state.currentPage = action.payload;
    },
    setFilters(state, action){
      if(Object.keys(action.payload).length){
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    }else{
      state.currentPage = 1;
      state.categoryId = 0;
      state.sort = {
          name: 'популярности', 
          sortProperty: 'rating'
        }
    }
    }
  }
})
export const selectFilter = (state:Rootstate) => state.filter;
export const selectSort = (state:Rootstate) => state.filter.sort;
export const {setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions;
export default filterSlice.reducer;