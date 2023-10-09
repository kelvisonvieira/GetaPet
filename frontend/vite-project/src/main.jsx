import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import{createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./routes/Home.jsx"
import Contact from "./routes/Contact.jsx"

const route =createBrowserRouter([{
  path: "/",
  element: <Home/>,
},
{
  path: "contact",
  element: <Contact/>,
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router= {route}/>
  </React.StrictMode>
)
