import { useLocation } from 'react-router-dom';

const Searched = () => {
    const location = useLocation();
    const searched = location.state.searchTerm;

    return (
        <div>
            <p>You searched {searched}</p>
        </div>
    );
};

export default Searched;
