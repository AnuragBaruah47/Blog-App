import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Store/Store.js'
import { Router,createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Authlayout, Login } from './Components/Index.js'
import Home from "./Pages/Home.jsx"
import Signup from './Pages/Signup.jsx'
// import Login from './Pages/Login.jsx'
import Allposts from './Pages/Allposts.jsx'
import Addpost from './Pages/Addpost.jsx'
import EditPost from './Pages/EditPost.jsx'
import Post from './Pages/Post.jsx'

const router=createBrowserRouter([
   {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <Authlayout authentication={false}>
                    <Login />
                </Authlayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <Authlayout authentication={false}>
                    <Signup />
                </Authlayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <Authlayout authentication>
                    {" "}
                    <Allposts />
                </Authlayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <Authlayout authentication>
                    {" "}
                    <Addpost />
                </Authlayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <Authlayout authentication>
                    {" "}
                    <EditPost />
                </Authlayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/> 
    </Provider>
  </StrictMode>,
)
