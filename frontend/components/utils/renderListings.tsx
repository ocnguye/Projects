import { Listing } from '../../api/search';
import { Grid } from '@mui/material';
import Price from '../search/price';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from 'react-router-dom';

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

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
        }}>
            {
                data.map((listing) => (
                <div
                    className="m-1 p-1 bg-yellow-200 hover:scale-102 ease-in-out duration-300 flex"
                    key={listing.id}
                    onClick={() => navigate(`/listing/${listing.id}`, { state: listing })}
                    style={{
                        width: '220px',
                        borderRadius: '10px',
                    }}
                >   
                    <Grid container>
                        <Grid xs={12}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <div
                                style={{
                                    height: '200px',
                                    width: '210px',
                                    padding: 5
                                }}
                                >
                                <img src={ cleanImage(listing.images) } alt={listing.collectible.name} 
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                }} />
                            </div>
                        </Grid>
                        <Grid xs={3} style={{ display: 'flex', justifyContent: 'center' }} />
                        <Grid xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} >
                            <div className='flex pr-1'>$<Price data={listing.price} /></div>
                            {listing.verified ? <VerifiedIcon color="success" fontSize='large'/> : null}
                        </Grid>
                        <Grid xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }} >
                            <div className='flex'>{formatSeries(listing.collectible.series)}</div>
                        </Grid>
                        <Grid xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }} >
                            <div className='flex'>{listing.collectible.name}</div>
                        </Grid>
                    </Grid>
                </div>
            ))}
        </div>
    )
};

export default RenderListings;
