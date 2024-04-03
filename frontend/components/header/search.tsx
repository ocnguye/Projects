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
        <Link to={`/search`} state={{searchTerm: debouncedSearchTerm}} className='flex'>
            <form onSubmit={handleSubmit} >
            <input
                className='rounded-lg border-none bg-gray-300 p-1 text-black text-md h-8'
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
            />
            </form>
        </Link>
    );
}
export default Search;
