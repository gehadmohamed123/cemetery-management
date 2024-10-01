import React, { useEffect } from "react";
import {createBrowserRouter ,RouterProvider} from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Man from "./components/User/Man/Man";
import Woman from './components/User/Woman/Woman';
import Bones from './components/User/Bones/Bones';
import Suggestion from './components/User/Suggestion/Suggestion';
import Contact from "./components/User/Contact/Contact";
import Login from './components/User/Login/Login';
import { useState } from 'react';
import {jwtDecode} from 'jwt-decode';  
import SuggestionsPage from './components/Admin/SuggestionsPage/SuggestionsPage';
import CreateGrave from './components/Admin/CreateGrave/CreateGrave';
import RegisterPage from './components/Admin/RegisterPage/RegisterPage';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {Offline, Online} from 'react-detect-offline';
import ShowGraves from "./components/Admin/ShowGraves/ShowGraves";
import GraveDetails from "./components/Admin/GraveDetails/GraveDetails";
import ArticleDetail from "./components/User/ArticleDetails/ArticleDetail";

function App () {
  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      saveUserData(); 
    }
  }, []);
  
  const [userData, setUserData] = useState(null);

  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    if (encodedToken) {
      let decodedToken = jwtDecode(encodedToken);
      setUserData(decodedToken); 
    }
  }
  let routers = createBrowserRouter([
    { path: '/', element: <Layout setUserData={setUserData} userData={userData}/>, children: [
      { index: true, element: <Home/> },
      { path: 'man', element: <Man/> },
      { path: 'woman', element: <Woman/> },
      { path: 'bones', element: <Bones/> },
      { path: 'suggest', element: <Suggestion/> },
      { path: 'contact', element: <Contact/> },
      {path: "/ArticleDetail/:id", element: <ArticleDetail/>},
      { path: 'suggestions', element: <ProtectedRoute userData={userData}><SuggestionsPage/></ProtectedRoute> },
      { path: 'creategrave', element: <ProtectedRoute userData={userData}><CreateGrave/></ProtectedRoute> },
      { path: 'register', element: <ProtectedRoute userData={userData}><RegisterPage/></ProtectedRoute> },
      { path: 'showgraves', element: <ProtectedRoute userData={userData}><ShowGraves/></ProtectedRoute> },
      { path: 'graves/:graveId', element: <ProtectedRoute userData={userData}><GraveDetails/></ProtectedRoute> }, 
      { path: 'login', element: <Login saveUserData={saveUserData}/> }
    ]}
  ]);
  
    return (
    <>
    <div>
      <Offline><div className="offline">You Are Offline</div></Offline>
    </div>
    <RouterProvider router={routers}/>
    </>
    )
  }
export default App;
