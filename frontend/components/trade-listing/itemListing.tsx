import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Listing } from '../../api/search';
import VerifiedIcon from '@mui/icons-material/Verified';
import Avatar from '@mui/material/Avatar';
import { renderRating } from '../utils/renderRating';
import { cleanImage } from '../utils/images';
import useWindowDimensions from '../../utils/window';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SaveListing from './SaveListing';
import { post } from '../../api/api';
import { useAuth, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';


const ItemListing = () => {
    const { getToken } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const listing: Listing = location.state;
    const { user } = useClerk();

    const formatSeries = ( series: string ) => {
        if (series.includes("-")) {
            return series.split("-")[0].toUpperCase()[0] + series.split("-")[0].substring(1) + " " + series.split("-")[1].toUpperCase()[0] + series.split("-")[1].substring(1);
        }
        return series.toUpperCase()[0] + series.substring(1) + " Series";
    }


    const getImages = (images: string) => {
        images = images.replace(/'/g, '');
        images = images.replace(/\[/g, '');
        const ret = images.split(', ').map((image) => cleanImage(image));
        return ret;
    }
    const [imageIndex, setImageIndex] = React.useState(0);
    const images = getImages(listing.images);

    const { width } = useWindowDimensions();
    return (
        <section className='grid w-full gap-3 sm:grid-cols-2 h-full pt-3'>
            <div className='flex-1 align-items-center justify-center'>
                <div className='grid row-start-1 col-start-1 items-center'>
                    <img src={images[imageIndex]} alt={listing.collectible.name} className='object-cover rounded-lg row-start-1 col-start-1' style={{width: width, height: width > 640 ? width/2 : width}}/>
                    <div className='flex row-start-1 col-start-1 justify-between'>
                        <ArrowBackIcon onClick={() => setImageIndex(( imageIndex+images.length - 1) % images.length)} className='hover:cursor-pointer hover:bg-gray-500 rounded-full m-2' fontSize='large'/>
                        <ArrowForwardIcon onClick={() => setImageIndex(( imageIndex + 1) % images.length )} className='hover:cursor-pointer hover:bg-gray-500 rounded-full m-2' fontSize='large'/>
                    </div>
                </div>
                <div className='flex flex-wrap'>
                    {images.map((image, index) => (
                        <div className='pr-1 pt-1' key={image}
                            onClick={() => setImageIndex(index)}
                        >
                            <img src={image} alt={listing.collectible.name} className='object-cover w-16 h-16 rounded-xl hover:cursor-pointer'
                            style={{
                                border: imageIndex === index ? '3px solid gray' : 'none'
                            }}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col justify-start space-y-2'>
                <div>
                    <h1 className='text-3xl'>{formatSeries(listing.collectible.series)}</h1>
                    <div className='flex justify-between align-middle'>
                        <h2 className='text-gray-500'>{listing.collectible.name}</h2>
                        <div className='flex space-x-1'>
                            <p>{listing.price ? "$" + listing.price : ""}</p>
                            { listing.verified ? <VerifiedIcon color="success"/> : <></>}
                        </div>
                    </div>
                    <p>
                        {listing.description}
                    </p>
                </div>
                <div className='flex space-x-2'>
                    <div className="hover:cursor-pointer flex justify-center items-center hover:scale-102 bg-green-350 text-black rounded-lg transition duration-300 ease-in-out hover:bg-green-450 outline outline-green-450 outline-3 w-full" 
                    onClick={async () => {
                        navigate(`/messages`);
                        const token = await getToken();
                        const data = {
                          username: user?.username,
                          otherName: listing.user.username,
                          otherId: listing.user.user,
                        }
                        await post(`channel/`, data, token);
                        }
                    }
                    >
                        <p className='text-md'>Message User</p>
                    </div>
                    <SaveListing listing={listing}/>
                </div>
                <div className='space-y-2 w-full sm:col-span-2'>
                    <h1 className='text-3xl'>User Information</h1>
                    <div className='flex w-full justify-between items-center'>
                        <div className='flex justify-start space-x-3 items-center'>
                            <Avatar src={listing.user.profile_img} sx={{
                                width: 50,
                                height: 50,
                            
                            }}/>         
                            <div>
                                <a className='text-lg underline text-green-400 hover:text-red-500 hover:cursor-pointer'>{listing.user.username}</a>
                                <div className='flex space-x-1 items-center'>
                                    <p>{renderRating(listing.user.rating)}</p>
                                    <p className='pt-1'>({listing.user.raters})</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ItemListing;