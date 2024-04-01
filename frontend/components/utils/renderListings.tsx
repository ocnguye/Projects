import { Listing } from '../../api/search';
import { Grid } from '@mui/material';
import Price from '../search/price';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from 'react-router-dom';
import useWindowDimensions from '../../utils/window';

type ListingsParams = {
    data: Listing[],
}

const RenderListings = ({data}: ListingsParams) => {
    const navigate = useNavigate();

    const cleanImage = ( image: string ) => {
        const cdn = "https://d3jvwclgjetaaw.cloudfront.net/";
        image = image.replace("[", "").replace("]", "").replace("'", "").replace("'", "").split(" ")[0].replace(",", "");
        image = cdn + image.split("/")[image.split("/").length - 1];
        return image;
    }

    const formatSeries = ( series: string ) => {
        if (series.includes("-")) {
            return series.split("-")[0].toUpperCase()[0] + series.split("-")[0].substring(1) + " " + series.split("-")[1].toUpperCase()[0] + series.split("-")[1].substring(1);
        }
        return series.toUpperCase()[0] + series.substring(1) + " Series";
    }
    const { width } = useWindowDimensions();
    return (
        <div className='grid grid-cols-2 gap-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 w-full'
        >
            {
                data.map((listing) => (
                    <div className='bg-yellow-200 rounded-lg p-2 space-y-2'>
                        <img src={cleanImage(listing.images)} alt="" className='rounded-2xl object-cover h-44 w-full'
                        onClick={() => navigate(`/listing/${listing.id}`, { state: listing })}
                        />
                        <div className=''>
                            <div className='flex justify-between items-center'>
                                <div className='flex'>${<Price data={listing.price} />}</div>
                                {listing.verified ? <VerifiedIcon color="success" fontSize='large'/> : null}
                            </div>
                            <div className='flex'>{formatSeries(listing.collectible.series)}</div>
                            <div className='flex opacity-70'>{listing.collectible.name}</div>
                        </div>
                    </div>
                // <div
                //     className="bg-yellow-200 hover:scale-102 ease-in-out duration-300"
                //     key={listing.id}
                    // onClick={() => navigate(`/listing/${listing.id}`, { state: listing })}
                //     style={{
                //         borderRadius: '10px',
                //     }}
                // >   
                //     <Grid container>
                //         <Grid xs={12}
                //             style={{
                //                 display: 'flex',
                //                 justifyContent: 'center',
                //             }}
                //         >
                //             <div
                //                 style={{
                //                 }}
                //                 >
                //                 <img src={ cleanImage(listing.images) } alt={listing.collectible.name}
                //                 className='object-cover rounded-lg'/>
                //             </div>
                //         </Grid>
                //         <Grid xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} >
                //             <div className='flex'>$<Price data={listing.price} /></div>
                //             {listing.verified ? <VerifiedIcon color="success" fontSize='large'/> : null}
                //         </Grid>
                //         <Grid xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }} >
                //             <div className='flex'>{formatSeries(listing.collectible.series)}</div>
                //         </Grid>
                //         <Grid xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }} >
                //             <div className='flex'>{listing.collectible.name}</div>
                //         </Grid>
                //     </Grid>
                // </div>
            ))}
        </div>
    )
};

export default RenderListings;
