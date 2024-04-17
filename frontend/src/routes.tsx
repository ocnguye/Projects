import { createBrowserRouter} from 'react-router-dom';
import App from './App';
import Home from '../components/homepage/home';
import Searched from '../components/homepage/searched';
import Profile from '../components/profile/profile';
import TradeListing from '../components/trade-listing/tradeListing';
import ItemListing from '../components/trade-listing/itemListing';
import About from '../components/about/about';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import ErrorPage from '../components/ErrorPage';
import Trades from '../components/trades/trades';
import Collection from '../components/collection_page/collections';
import Help from '../components/Help';
import Contact from '../components/Contact';
import Messages from '../components/messages/messages';
import Chat from '../components/messages/chat';

export const router = createBrowserRouter([
    {path: '/', element: <App />, errorElement: <ErrorPage />,
    children: [
        {path: '', element: <Home />},
        {path: 'search', element: <Searched />},
        {path: 'about', element: <About />},
        {path: 'help', element: <Help />},
        {path: 'contactus', element: <Contact />},
        {path: 'profile', element: <Profile />},
        {path: 'product/:id', element: <TradeListing />},
        {path: 'trades', element: <Trades />},
        {path: 'listing/:id', element: <ItemListing />},
        {path: 'collection', element: <Collection />}, 
        {path: 'messages', element: <Messages />},
        {path: 'messages/:id', element: <Chat />},
    ]},

    {path : '/login', element: <Login />, },
    {path : '/signup', element: <SignUp />, },
    
])