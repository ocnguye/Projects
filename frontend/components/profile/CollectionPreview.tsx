import { useAuth, useClerk } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { getProfileCollection } from '../../api/pfpcollection';
import { CollectionData, PCollection } from '../collection_page/collections';
import { ScrollArea, ScrollBar } from '../utils/ScrollArea';
import { getProductImage } from '../../utils/images';
import { useNavigate } from 'react-router-dom';
import { formatSeries } from '../utils/utils';


const CollectionPreview = () => {
  const { user } = useClerk();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery<CollectionData>({
      queryKey: ['pCollection', user?.id],
      queryFn: async () => {
          if (user?.id === undefined) return undefined;
          const token = await getToken();
          const resp = await getProfileCollection(user.id, token);
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
            <h3 className='green'>Collection Preview</h3>
            <a href={`/collections/${user?.id}`} className='underline text-red-500'>View All</a>
          </div>
          <ScrollArea className="w-full whitespace-nowrap h-auto rounded-md scroll-p-2">
              <div className="flex w-max space-x-2 h-full">
                  {data.collectibles.map((collectible: PCollection) => (
                      collectible.owned && <div
                          className="bg-gray-100 hover:scale-102 ease-in-out duration-300
                  flex flex-col items-center hover:cursor-pointer rounded-2xl w-40 p-3"
                          key={collectible.id}
                          onClick={() => navigate(`/collection/${user?.id}`)}
                      >
                          <img
                              src={getProductImage(collectible.image)}
                              alt={collectible.name}
                              className="w-24 h-24 object-contain"
                          />
                          <p className="text-wrap text-sm self-start px-2">
                              {collectible.name}
                          </p>
                          <p className='text-wrap text-sm self-start px-2 font-bold'>
                              Series - {formatSeries(collectible.series)}
                          </p>
                      </div>
                  ))}
              </div>
              <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      )}
      {!data && !isLoading && !isError && <p> Try adding collectibles in the collections page or buy/trade some! </p>}
    </div>
  )
}

export default CollectionPreview