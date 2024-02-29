import { useQuery } from "@tanstack/react-query";
import { getWishlistRecommendations } from "../../api/recommendations";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const {data, isLoading, isError }: any = useQuery({
        queryKey: ['wishlist'],
        queryFn: async () => {
            const token = await getToken();
            const resp = await getWishlistRecommendations(token);
            return resp!.data;
        } 
    });

    const width = 150;
    console.log(data);

    return (
        <>
        { !isLoading && !isError ? (
            Object.keys(data).length === 0 ? (
            // If there are no items in the wishlist, display a message
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
                <p>We couldn't find any results. Try adding more items to your wishlist :]</p>
            </div>
            </> 
            ) : (
            // If there are items in the wishlist, display them
            <div style={{ display: 'flex', width: width*Object.keys(data).length }}>
                {Object.keys(data).map((key: any, index: any) => (
                    <div
                        className="bg-green-100
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

export default Wishlist;