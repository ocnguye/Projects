import { useQuery } from '@tanstack/react-query';
import { getFeatured } from '../../api/featured';
import { useAuth } from '@clerk/clerk-react';
import { Skeleton } from '../utils/Skeleton';

/*
name = models.CharField(max_length=100)
description = models.TextField(default="")
link = models.TextField(default="")
address = models.TextField(default="")
image = models.TextField(default="")
*/

type FeaturedEvent = {
  id: string;
  name: string;
  description: string;
  link: string;
  address: string;
  image: string;
}

const EventsList = () => {
  const { getToken } = useAuth();
  
  const{ data, isLoading, isError } = useQuery<FeaturedEvent[]>({
    queryKey: ['events'],
    queryFn: async () => {
      const token = await getToken();
      const resp = await getFeatured(token);
      return resp?.data;
    }
  });
  return (
  <div className='flex flex-row w-full justify-center'>
    {!isLoading && !isError && data ? (
      <div className='max-w-[800px] space-y-2'>
        {data.map((event: FeaturedEvent) => (
          <a href={event.link} className='flex flex-col items-center sm:flex-row w-full h-96 p-2 rounded-lg bg-yellow-300 border-yellow-500 border-2 border-opacity-40 shadow-lg hover:bg-yellow-200'>
            <img src={event.image} alt={event.name} className='w-full h-3/5 sm:h-full sm:w-3/5 object-cover rounded-xl'/>
            <div className='sm:items-start sm:h-full sm:p-2'>
              <h1 className='text-xl'>{event.name}</h1>
              <p className='text-sm text-black'>{event.description}</p>
            </div>
          </a>
        ))}
      </div>
    ) : (
      <div className='max-w-[800px] space-y-2 flex flex-col items-center'>
        {[1, 2, 3].map((event: number) => (
          <Skeleton className='w-[90vw] h-56 sm:h-64 sm:w-[95vw] md:w-[95vw] md:h-64 lg:w-[800px] bg-gray-300'
            key={event}
          />
        ))}
      </div>
    )}
  </div>
  )
}

export default EventsList;