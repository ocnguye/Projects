import { useAuth, useClerk } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { ProfileData, getProfile } from '../../api/profile';
// import { CollectionData, PCollection } from '../collection_page/collections';
import { ScrollArea, ScrollBar } from '../utils/ScrollArea';
import { cleanImage } from '../../utils/images';
import { useNavigate } from 'react-router-dom';
import { formatSeries } from '../utils/utils';
import { Listing } from '../../api/search';


const SavedPreview = () => {
  const { user } = useClerk();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery<ProfileData>({
      queryKey: ['savedPreview', user?.id],
      queryFn: async () => {
          if (user?.id === undefined) return undefined;
          const token = await getToken();
          const resp = await getProfile(user.id, token);
          return resp!.data;
      }
  });
  
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {data && (
        <div className='w-full flex flex-col bg-white shadow-lg space-y-3 min-h-56 rounded-xl p-4'>
          <div className='flex items-center space-x-3'>
            <h3 className='green'>Saved Preview</h3>
            <a href="/listings/" className='underline text-red-500'>View All</a>
          </div>
          <ScrollArea className="w-full whitespace-nowrap rounded-md scroll-p-2">
              <div className="flex w-max space-x-2 h-full">
                  {data?.saved.map((listing: Listing) => (
                      <div
                          className="bg-gray-100 hover:scale-102 ease-in-out duration-300
                  flex flex-col items-center hover:cursor-pointer rounded-2xl w-40 p-3"
                          key={listing.id}
                          onClick={() => navigate(`/listing/${listing.id}`, { state: listing })}
                      >
                          <img
                              src={cleanImage(listing.images)}
                              alt={listing.collectible.name}
                              className="w-full h-28 object-cover rounded-xl"
                          />
                          <p className="text-wrap text-sm self-start">
                              {listing.collectible.name}
                          </p>
                          <p className='text-wrap text-sm self-start font-bold'>
                              Series - {formatSeries(listing.collectible.series)}
                          </p>
                      </div>
                  ))}
              </div>
              <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      )}
      {!data && !isLoading && !isError && <p> Try adding listings you want to save! </p>}
    </div>
  )
}

export default SavedPreview