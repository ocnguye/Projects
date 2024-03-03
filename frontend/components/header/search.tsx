import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const Search: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(`/search`, { state: { searchTerm: debouncedSearchTerm } });
    };

    const [isFirstRun, setIsFirstRun] = useState(true);

    useEffect(() => {
        if (isFirstRun) {
            setIsFirstRun(false);
            return;
        }
        navigate(`/search`, { state: { searchTerm: debouncedSearchTerm } });
    }, [debouncedSearchTerm])
    

    return (
        <Link to={`/search`} state={{searchTerm: debouncedSearchTerm}} >
            <form onSubmit={handleSubmit} >
            <input
                style={{background: "white", borderRadius: 15, borderWidth: 0, paddingTop: 5, paddingBottom: 5, 
                paddingLeft: 10, paddingRight: 10, backgroundColor: "#D9D9D9", width: 400, height: 30,
                color: "black", fontSize: 15,
                }}
                type="text"
                placeholder="What are you looking for?"
                value={searchTerm}
                onChange={handleSearch}
            />
            </form>
        </Link>
    );
}
export default Search;
