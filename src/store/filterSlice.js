import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  category:'',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers:{
    addFilter:(state, action)=>{
      state.value = action.payload;
    },
    setCategory:(state, action)=>{
      state.category = action.payload;
    },
  }
})

export const {addFilter, setCategory} = filterSlice.actions;
export default filterSlice.reducer;
