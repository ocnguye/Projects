import { useQuery } from "@tanstack/react-query";
import { getMFCRecommendations } from "../../api/recommendations";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../utils/Skeleton";
import { getProductImage } from "../../utils/images";
import { ScrollArea, ScrollBar } from '../utils/ScrollArea';

const Missing = () => {
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const { data, isLoading, isError }: any = useQuery({
        queryKey: ['missing'],
        queryFn: async () => {
            const token = await getToken();
            const resp = await getMFCRecommendations(token);
            return resp!.data;
        }
    });

    return (
        <>
            {!isLoading && !isError ? (
                Object.keys(data).length === 0 ? (
                    <>
                        <div
                            className="flex flex-col items-center justify-center"
                            style={{
                                width: '100%',
                                height: '150px',
                                borderRadius: '10px',
                                margin: '5px',
                            }}
                        >
                            <p>We couldn't find any results, come back later and there may be more trades available! :&gt;</p>
                        </div>
                    </>
                ) : (
                    <ScrollArea className="w-full whitespace-nowrap rounded-md scroll-p-2">
                        <div className="flex w-max space-x-2">
                            {Object.keys(data).map((key: any, index: any) => (
                                <div
                                    className="pt-2 bg-yellow-200 hover:scale-102 ease-in-out duration-300
                            flex flex-col items-center justify-center hover:cursor-pointer"
                                    key={index}
                                    onClick={() => navigate(`/product/${key}`)}
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '10px',
                                    }}
                                >
                                    <img src={getProductImage(data[key][0].split(',')[1])} alt={key} style={{ height: '85%' }} />
                                    <p className="self-start pl-3">{data[key][0].split(',')[0]} Trades</p>
                                </div>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                )
            ) : (
                <div className="w-full grid grid-flow-col overflow-hidden">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((key: any) => (
                        <Skeleton key={key} className='pt-2 w-[150px] h-[150px] rounded-[10px] m-[5px]' />
                    ))}
                </div>
            )}
        </>
    );
};

export default Missing;