import { createBrowserRouter} from 'react-router-dom';
import App from './App'
import Home from '../components/homepage/home'
import Searched from '../components/homepage/searched';
import Profile from '../components/profile/profile';
import About from '../components/about/about';

export const router = createBrowserRouter([
    {path: '/', element: <App />, children: [
        {path: '', element: <Home />},
        {path: '/search', element: <Searched />},
        {path: 'about', element: <About />},
        {path: 'help', element: <div>Help</div>},
        {path: 'contactus', element: <div>Contact Us</div>},
        {path: 'profile', element: <Profile />},
    ]},
])