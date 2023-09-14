import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from 'axios';
import { Rootstate } from "../store";
import { Sort } from "./filterSlice";

export type SearchPizzaParams = {
  order: string,
  sortBy: string,
  category: string,
  search: string,
  currentPage: string
}
type Pizza = {
  id:string,
  imageUrl:string,
  title:string,
  types:number[],
  sizes:number[],
  price:number,
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',

}

interface PizzaSliceState{
  items : Pizza[],
  status: Status;
}

const initialState:PizzaSliceState={
  items:[],
  status: Status.LOADING,
}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzaStatus',
  async (params) => {
    const {order, sortBy, category, search, currentPage} = params;

    const {data} = await axios.get<Pizza[]>(`https://64f093088a8b66ecf779e060.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}${search}`);
    return data ;
  }
)

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers:{
    setItems(state, action: PayloadAction<Pizza[]>){
      state.items = action.payload;
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchPizzas.pending, (state)=>{
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state,action)=>{
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state,action)=>{
      state.status = Status.ERROR;
      state.items = [];
    })
  }
})
export const selectPizzaData = (state:Rootstate)=>state.pizza; 
export const {setItems} = pizzaSlice.actions;
export default pizzaSlice.reducer;