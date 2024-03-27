import { useLocation } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { searchCollectibles, SearchData, Trade } from '../../api/search';
import { useQuery } from '@tanstack/react-query';
import Requesting from '../search/requesting';
import Price from '../search/price';
import { Grid } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';


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
            <p>You searched {searched}</p>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    padding: '10px',
                }}
            >
            { !isLoading && !isError && data? 
                data?.trades.map((trade: Trade) => (
                    <div
                        className="m-1 p-1 bg-yellow-200 hover:scale-105 ease-in-out duration-300
                        flex"
                        key={trade.id}
                        style={{
                            width: '300px',
                            height: '200px',
                            borderRadius: '10px',
                        }}
                    >   
                        <Grid container>
                            <Grid xs={3} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Requesting data={[trade.requesting1, trade.requesting2, trade.requesting3]} />
                            </Grid>
                            <Grid xs={6}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        height: '150px',
                                    }}
                                    >
                                    <img src={ trade.trading.image } alt={trade.trading.name} style={{height: '100%'}} />
                                </div>
                            </Grid>
                            <Grid xs={3} style={{ display: 'flex', justifyContent: 'center' }} />
                            <Grid xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} >
                                <div className='flex pr-1'>$<Price data={trade.price} /></div>
                                <VerifiedIcon fontSize='large'/>
                            </Grid>
                        </Grid>
                    </div>
                ))
             : <p>Loading...</p> }
             </div>
        </div>
    );
};

export default Searched;
