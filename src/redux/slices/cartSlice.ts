import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Rootstate } from "../store";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

export type CartItem = {
  id:string,
  title:string,
  price:number,
  imageUrl:string,
  type:string,
  size:number,
  count: number,
}

const {items, totalPrice} = getCartFromLS();
interface CartSliceState {
  totalPrice:number,
  items: CartItem[],
}
const cartData = getCartFromLS();
const initialState:CartSliceState={
  totalPrice,
  items,
}

const cardSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{
  
    addItem(state,action:PayloadAction<CartItem>){
      const findItem = state.items.find(obj => obj.id === action.payload.id);
      if(findItem){
        findItem.count++;
      }else{
        state.items.push({
          ...action.payload,
          count:1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items)
      
    },
    minusItem(state, action:PayloadAction<string>){
      const findItem = state.items.find(obj => obj.id === action.payload);
      findItem && findItem.count--;
    },
    removeItem(state, action:PayloadAction<string>){
      state.items = state.items.filter(obj => obj.id !== action.payload)
    },
    clearItems(state){
      state.items = [];
      state.totalPrice = 0;
;    }
  }
});

export const selectCart = (state:Rootstate) => state.cart;
export const selectCartItemById = (id:string) => (state:Rootstate)=> state.cart.items.find((obj)=>obj.id === id)

export const {addItem, removeItem, minusItem,  clearItems} = cardSlice.actions;
export default cardSlice.reducer;