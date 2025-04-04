import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import Dashboard2 from './Dashboard2.jsx'
import Dashboard from './Dashboard.jsx'
import PopupEnquiryList from './pop_up/PopupEnquiryList.jsx';
import Home from './components/Home.jsx';
import Calendar from './components/Calendar.jsx';
import Analytics from './components/Analytics.jsx';
import Users from './components/Users.jsx';
import Database from './components/Database.jsx';
import Reports from './components/Reports.jsx';
import Setting from './components/Setting.jsx';


const routes=createBrowserRouter([
  {
    path:"/",
    element:<Dashboard/>,
    children:[
      {
        path: "dashboard", 
        element: <Home/>
      },
      {
        path: "analytics", 
        element: <Analytics/>
      },
      {
        path: "users", 
        element: <Users/>
      },
      {
        path: "calendar", 
        element: <Calendar/>
      },
      {
        path: "database", 
        element: <Database/>
      },
      {
        path: "popup", 
        element: <PopupEnquiryList/>
      },
      {
        path: "reports", 
        element: <Reports/>
      },
      {
        path: "settings", 
        element: <Setting/>
      },
    ]
    
  }
])

createRoot(document.getElementById('root')).render(
 <RouterProvider  router={routes}/>
)
