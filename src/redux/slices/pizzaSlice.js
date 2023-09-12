import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async (params) => {
    const {
      order,
      sortBy,
      category,
      search,
      currentPage
    } = params;

    const {data} = await axios.get(`https://64f093088a8b66ecf779e060.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}${search}`);
    return data
  }
)

const initialState={
  items:[],
  status: 'loading',
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers:{
    setItems(state, action){
      state.items = action.payload;
    },
  },
  extraReducers:{
    [fetchPizzas.pending]:(state)=>{
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]:(state,action)=>{
      state.items = action.payload;
      state.status = 'success';
      console.log(action, 'fulfilled');
    },
    [fetchPizzas.rejected]:(state,action)=>{
      state.status = 'error';
      state.items = [];
      console.log(action, 'rejected');
    },
  }
})
export const selectPizzaData = (state)=>state.pizza; 
export const {setItems} = pizzaSlice.actions;
export default pizzaSlice.reducer;