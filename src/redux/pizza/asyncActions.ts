import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pizza, SearchPizzaParams } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzaStatus',
  async (params) => {
    const {order, sortBy, category, search, currentPage} = params;

    const {data} = await axios.get<Pizza[]>(`https://64f093088a8b66ecf779e060.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}${search}`);
    return data ;
  }
)