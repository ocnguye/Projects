import NewTrade from './newTrade';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../api/profile';
import { useAuth } from '@clerk/clerk-react';
import { ProfileData } from '../profile/profile';
import { Listing } from '../../api/search';
import { formatSeries, cleanImage } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import Price from '../search/price';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Tooltip } from '@mui/material';
import SaveListing from '../trade-listing/SaveListing';

const SavedListings = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  
  const { data, isLoading, isError } = useQuery<ProfileData>({
    queryKey: ['savedListings'],
    queryFn: async () => {
      const token = await getToken();
      const resp = await getProfile(token);
      return resp!.data;
    }
  });

  return (
    <div className='h-screen pt-2 pb-10'>
      {!isLoading && !isError && data && data.collection ?
        (
          <div className='grid grid-cols-2 gap-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 w-full pb-28'>
            {data.saved.map((listing: Listing) => (
              <div key={listing.id} className='bg-yellow-200 rounded-lg p-2 space-y-2 hover:scale-101 ease-in-out duration-300 hover:cursor-pointer'>
                <img src={cleanImage(listing.images)} alt="" className='rounded-2xl object-cover h-44 w-full'
                  onClick={() => navigate(`/listing/${listing.id}`, { state: listing })}
                />
                <div className=''>
                  <div className='flex justify-between items-center'>
                    <div className='flex'>${<Price data={listing.price} />}</div>
                    {listing.verified ?
                      <Tooltip title="Verified Smiski copyright" arrow>
                        <VerifiedIcon color="success" fontSize='large' />
                      </Tooltip>
                      : null
                    }
                  </div>
                  <div className='flex'>{formatSeries(listing.collectible.series)}</div>
                  <div className='flex justify-between space-x-1 items-center'>
                    <div className='flex opacity-70 overflow-hidden'>{listing.collectible.name}</div>
                    <SaveListing listing={listing}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
        :
        (
          <div className="text-2xl">Loading...</div>
        )}
      <NewTrade />
    </div>
  );
};

export default SavedListings;
