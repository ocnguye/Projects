import { useQuery } from "@tanstack/react-query";
import { getMFCRecommendations } from "../../api/recommendations";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Missing = () => {
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const {data, isLoading, isError }: any = useQuery({
        queryKey: ['missing'],
        queryFn: async () => {
            const token = await getToken();
            const resp = await getMFCRecommendations(token);
            return resp!.data;
        } 
    });

    const width = 150;
    console.log(data);

    return (
        <>
        { !isLoading && !isError ? (
            Object.keys(data).length === 0 ? (
            <>
            <div
                className="bg-green-100
                flex flex-col items-center justify-center"
                style={{
                    width: '100%',
                    height: '150px',
                    borderRadius: '10px',
                    margin: '5px',
                }}
            >
                <p>We couldn't find any results, come back later and there may be more trades available! :]</p>
            </div>
            </> 
            ) : (
            <div style={{ display: 'flex', width: width*Object.keys(data).length }}>
                {Object.keys(data).map((key: any, index: any) => (
                    <div
                        className="pt-2 bg-yellow-200 hover:scale-110 ease-in-out duration-300
                        flex flex-col items-center justify-center"
                        key={index}
                        onClick={() => navigate(`/product/${key}`)}
                        style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '10px',
                            margin: '5px',
                        }}
                    >
                        <img src={ data[key][0].split(',')[1] } alt={key} style={{height: '85%'}} />
                        <p className="self-start pl-3">{data[key][0].split(',')[0]} Trades</p>
                    </div>
                ))}
            </div>
            )
        ) : (<></>)}
        </>
    );
};

export default Missing;