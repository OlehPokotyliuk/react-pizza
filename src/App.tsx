import React,{Suspense, lazy} from "react";
import "./scss/app.scss";
import Home from "./pages/Home";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import {Routes, Route} from 'react-router-dom';
const Cart = lazy(() => import(/*webpackChunkName:"[Cart]"*/'./pages/Cart'));
const FullPizza = lazy(() => import(/*webpackChunkName:"[FullPizza]"*/'./pages/FullPizza'));
const NotFound = lazy(() => import(/*webpackChunkName:"[NotFound]"*/"./pages/NotFound/NotFound"));
const MainLayout = lazy(() => import(/*webpackChunkName:"[MainLayout]"*/"./layouts/MainLayout"));
function App() {
  return ( 
    <Suspense fallback={<>Загрузка</>}>
          <Routes>
            <Route path="/" element={<MainLayout/>}>
              <Route path={"react-pizza"} element={<Home />}/>
              <Route path={"cart"} element={<Cart/>}/>
              <Route path={"pizza/:id"} element={<FullPizza/>}/>
              <Route path={"*"} element={<NotFound/>}/>
            </Route>
          </Routes>
    </Suspense>
  );
}
 
export default App;