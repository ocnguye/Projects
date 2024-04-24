import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { getFeatured } from '../../api/featured';
import { Skeleton } from '../utils/Skeleton';

const Featured = () => {
    const { getToken } = useAuth();
    const [currentIndex, setCurrentIndex] = useState(0);

    const {data, isLoading, isError }: any = useQuery({
        queryKey: ['featured'],
        queryFn: async () => {
            const token = await getToken();
            const resp = await getFeatured(token);
            return resp!.data;
        }
    })

    useEffect(() => {
        if (isLoading || isError) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [data]);

    const cleanImage = ( image: string ) => {
        const cdn = "https://d3jvwclgjetaaw.cloudfront.net/";
        image = cdn + image.split("/")[image.split("/").length - 1];
        return image;
    }

    return (
        <div className=''>
        { !isLoading && !isError ? (
            <a href={data[currentIndex].link}>
            <div style={{  
                borderWidth: 3,
                borderColor: '#79BD44',
            }}
            className='h-[250px] xs:h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] 2xl:h-[600px] overflow-hidden rounded-[20px]'
            >
                <img src={ cleanImage(data[currentIndex].image) } alt={data[currentIndex].name} 
                    style={{
                        borderRadius: 18,
                    }}
                    className='object-cover w-full h-full'
                />
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
            >
                {data.map((_: any, index: any) => (
                    <div
                    key={index}
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        margin: "0 5px",
                        background: index === currentIndex ? "black" : "gray",
                    }}
                    />
                    ))}
            </div>
            </a>
            ) : (
                <div className='w-full'>
                    <Skeleton className='w-full h-[250px] xs:h-[350px] sm:h-[400px] md:h-[450px] lg:h-[550px] xl:h-[650px] 2xl:h-[750px] overflow-hidden rounded-[20px] bg-gray-300' />
                    <div className='flex justify-center'>
                        <Skeleton className='h-4 w-10 my-2 bg-gray-300'/>
                    </div>
                </div>
                )}
            </div>
    );
};

export default Featured;
