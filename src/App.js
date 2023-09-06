import "./scss/app.scss";
import {Header} from './Components/Header/Header';
import {Home} from "./pages/Home";
import {Cart} from "./pages/Cart";
import { NotFound } from "./pages/NotFound/NotFound";
import {Routes, Route} from 'react-router-dom';
import { useState, createContext } from "react";
export const AppContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');  
  return ( 
    <AppContext.Provider value={{searchValue, setSearchValue}}>
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
    </AppContext.Provider>
  );
}

export default App;