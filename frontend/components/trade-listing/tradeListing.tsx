import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { getCollectible, CollectibleIdData } from '../../api/collectibles';
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import RenderListings from '../utils/renderListings';

const TradeListing = () => {
    const { id } = useParams();
    const { getToken } = useAuth();

    const { data, isLoading, isError } = useQuery<CollectibleIdData>({
        queryKey: ['tradeListing', id],
        queryFn: async () => {
            const token = await getToken();
            if (!token || !id) return;
            const resp = await getCollectible(id, token);
            return resp!.data;
        }
    })

    const formatSeries = ( series: string ) => {
        if (series.includes("-")) {
            return series.split("-")[0].toUpperCase()[0] + series.split("-")[0].substring(1) + " " + series.split("-")[1].toUpperCase()[0] + series.split("-")[1].substring(1);
        }
        return series.toUpperCase()[0] + series.substring(1) + " Series";
    }

    return (
        <div>
            { !isLoading && !isError && data ? (
                <div>
                    <Grid container >
                        <Grid xs={1}
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}
                        >
                            <div
                                className="pt-2 hover:scale-105 ease-in-out duration-300
                                flex flex-col items-center justify-center"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '10px',
                                    margin: '5px',
                                }}
                            >
                                <img src={ data.collectible.image } style={{height: '100%'}} />
                            </div>
                        </Grid>
                        <Grid xs={11}
                            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                        >
                            <h1>{formatSeries(data.collectible.series)}</h1>
                            <p>{data.collectible.name}</p>
                        </Grid>
                        <Grid xs={12}>
                            <RenderListings data={data.listings} />
                        </Grid>
                    </Grid>
                </div>
            ) : (<><CircularProgress></CircularProgress></>) }
        </div>
    );
}

export default TradeListing;