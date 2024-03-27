import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type SearchData = {
    
}

const Searched = () => {
    const location = useLocation();
    const searched = location.state.searchTerm;

    useEffect(() => {
        // make a get request to the backend for data
    }, [searched]);

    return (
        <div>
            <p>You searched {searched}</p>
        </div>
    );
};

export default Searched;
