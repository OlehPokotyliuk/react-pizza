import "./scss/app.scss";
import {Header} from './Components/Header/Header';
import {Home} from "./pages/Home";
import {Cart} from "./pages/Cart";
import { NotFound } from "./pages/NotFound/NotFound";
import {Routes, Route} from 'react-router-dom';
import { useState, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFilter, setCategory } from '../src/redux/slices/filterSlice'
export const SearchContext = createContext();
function App() {
  const [searchValue, setSearchValue] = useState('');  
  const dispatch = useDispatch();
  console.log(dispatch);
  return ( 
    <SearchContext.Provider value={{searchValue, setSearchValue}}>
      <div className = "App" >
          <div className="wrapper">
      <Header/>
      <div className="content">
          <Routes>
            <Route path={"/"} element={<Home />}/>
            <Route path={"/cart"} element={<Cart/>}/>
            <Route path={"*"} element={<NotFound/>}/>
          </Routes>
        </div>
      </div>
    </div>
    </SearchContext.Provider>
  );
}

export default App;