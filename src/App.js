import "./scss/app.scss";
import {Home} from "./pages/Home";
import {Cart} from "./pages/Cart";
import { NotFound } from "./pages/NotFound/NotFound";
import {FullPizza} from "./pages/FullPizza";
import {Routes, Route} from 'react-router-dom';
import {  useDispatch } from "react-redux";
import { MainLayout } from "./layouts/MainLayout";


function App() {
  const dispatch = useDispatch();
  return ( 
        
          <Routes>
            <Route path="/" element={<MainLayout/>}>
              <Route path={""} element={<Home />}/>
              <Route path={"cart"} element={<Cart/>}/>
              <Route path={"pizza/:id"} element={<FullPizza/>}/>
              <Route path={"*"} element={<NotFound/>}/>
            </Route>
          </Routes>
  );
}
 
export default App;