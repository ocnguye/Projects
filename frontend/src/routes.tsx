import { createBrowserRouter} from 'react-router-dom';
import App from './App'
import Home from '../components/homepage/home'
import Searched from '../components/homepage/searched';
import Profile from '../components/profile/profile';
import TradeListing from '../components/trade-listing/tradeListing';
import About from '../components/about/about';
import SignUp from '../components/SignUp'
import Login from '../components/Login'
import Help from '../components/Help'
import Contact from '../components/Contact'

export const router = createBrowserRouter([
    {path: '/', element: <App />, children: [
        {path: '', element: <Home />},
        {path: 'search', element: <Searched />},
        {path: 'about', element: <About />},
        {path: 'help', element: <Help />},
        {path: 'contactus', element: <Contact />},
        {path: 'profile', element: <Profile />},
        {path: 'product/:id', element: <TradeListing />},
    ]},

    {path : '/login', element: <Login />, },
    {path : '/signup', element: <SignUp />, }
])