import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { getCollectible, CollectibleIdData } from '../../api/collectibles';
import CircularProgress from '@mui/material/CircularProgress';
import RenderListings from '../utils/renderListings';
import { getProductImage } from '../../utils/images';

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
                <div className='grid justify-start grid-cols-3 space-y-2'>
                    <div
                        className="pt-2 hover:scale-101 ease-in-out duration-300
                        flex flex-row justify-start items-center col-span-3"
                    >
                        <img src={ getProductImage(data.collectible.image) } className='object-cover h-32 rounded-xl col-span-1' />
                        <div className='col-span-2'>
                            <h1>{formatSeries(data.collectible.series)}</h1>
                            <p>{data.collectible.name}</p>
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <RenderListings data={data.listings} />
                    </div>
                </div>
            ) : (<><CircularProgress></CircularProgress></>) }
        </div>
    );
}

export default TradeListing;