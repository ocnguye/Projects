import { useLocation } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { searchCollectibles, SearchData } from '../../api/search';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import RenderListings from '../utils/renderListings';


const Searched = () => {
    const location = useLocation();
    const searched = location.state.searchTerm;
    const { getToken } = useAuth();

    const { data, isError, isLoading} = useQuery<SearchData>({
        queryKey: ['search', searched],
        queryFn: async () => {
            const token = await getToken();
            const resp = await searchCollectibles(searched, token);
            return resp!.data;
        },
    });

    return (
        <div>
            <p>Showing results for "{searched ? searched : "All"}"</p>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                }}
            >
            { !isLoading && !isError && data ? 
                <RenderListings data={data.listings} />
             : 
             <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '90vh',
                    width: '100vw',
             }}>
                 <CircularProgress color="success" size={100}/>
             </div>}
             </div>
        </div>
    );
};

export default Searched;
