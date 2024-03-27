import { createBrowserRouter} from 'react-router-dom';
import App from './App'
import Home from '../components/homepage/home'
import Searched from '../components/homepage/searched';
import Profile from '../components/profile/profile';
import TradeListing from '../components/trade-listing/tradeListing';
import About from '../components/about/about';
import SignUp from '../components/SignUp'
import Login from '../components/Login'
import ErrorPage from '../components/ErrorPage'
import Trades from '../components/trades/trades';

export const router = createBrowserRouter([
    {path: '/', element: <App />, errorElement: <ErrorPage />,
    children: [
        {path: '', element: <Home />},
        {path: 'search', element: <Searched />},
        {path: 'about', element: <About />},
        {path: 'help', element: <div>Help</div>},
        {path: 'contactus', element: <div>Contact Us</div>},
        {path: 'profile', element: <Profile />},
        {path: 'product/:id', element: <TradeListing />},
        {path: 'trades', element: <Trades />}
    ]},

    {path : '/login', element: <Login />, },
    {path : '/signup', element: <SignUp />, },
    
])