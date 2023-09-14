import { Rootstate } from "../../store";

export const selectFilter = (state:Rootstate) => state.filter;
export const selectSort = (state:Rootstate) => state.filter.sort;
