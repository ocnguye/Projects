import React, { useState, useEffect, useRef } from 'react';
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
        navigate(`/search/:${debouncedSearchTerm}`);
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
        <Link to={`/search`} state={{searchTerm: debouncedSearchTerm}}>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <p>Search Term: {debouncedSearchTerm}</p>
            </form>
        </Link>
    );
}
export default Search;
