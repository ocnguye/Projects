import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import { getFeatured } from '../../api/featured';

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
        }, 3000);
        return () => clearInterval(interval);
    }, [data]);


    return (
        <>
        { !isLoading && !isError ? (
            <a href={data[currentIndex].link}>
            <div style={{ display: "flex",flexDirection: "column", justifyContent: "center", 
            alignItems: "center", width: "100%", height: 600, background: "#F2DEDE", 
            borderRadius: 20,  backgroundImage:`url(${data[currentIndex].image})`, backgroundSize: 'cover',
            borderWidth: 3, }}
            className='border-green-600'
            // onClick={ () => navigate(data[currentIndex].link) }
            >
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
                <></>
                )}
            </>
    );
};

export default Featured;
