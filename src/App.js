import React from "react";
import {createBrowserRouter ,RouterProvider} from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Man from "./components/User/Man/Man"
import Woman from './components/User/Woman/Woman'
import Bones from './components/User/Bones/Bones'
import Suggestion from './components/User/Suggestion/Suggestion'
import Contact from "./components/User/Contact/Contact";
import Login from './components/User/Login/Login'

let routers = createBrowserRouter([
  {path:'/', element:<Layout/> , children : [
   {path:'home' , element : <Home/>},
   {path: 'man',element:<Man/>},
   {path:'woman' ,element:<Woman/>},
   {path:'bones',element:<Bones/>},
   {path: 'suggest',element:<Suggestion/>},
   {path:'contact',element:<Contact/>},
   {path:'login',element:<Login/>}
  ]}
])
function App () {
    return <RouterProvider router={routers}/>
  }
export default App;
