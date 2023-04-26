import { createBrowserRouter } from 'react-router-dom'
import Register from '../components/Register'
import Login from '../components/Login'
import Home from '../components/Home'
import PageNotFound from '../components/PageNotFound'

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <div>Welcome To Home Page</div>,
            errorElement: <PageNotFound />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/register',
            element: <Register />
        },
        {
            path: '/home',
            element: <Home />
        }
    ]
)


export default router;