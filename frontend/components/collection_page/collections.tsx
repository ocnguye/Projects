import { getProfileCollection } from "../../api/pfpcollection";
import { useAuth } from "@clerk/clerk-react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getProductImage } from "../../utils/images";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { post } from "../../api/api";


type CollectionData = {
    collectibles: PCollection[],
}

type PCollection = {
    id: number,
    name: string,
    series: string,
    image: string,
    product: string,
    owned: boolean,
    wishlisted: boolean,
}

const Collection = () => {
    const { getToken } = useAuth();
    const queryClient = useQueryClient()

    const { data, isLoading, isError } = useQuery<CollectionData>({
        queryKey: ['pCollection'],
        queryFn: async () => {
            const token = await getToken();
            const resp = await getProfileCollection(token);
            return resp!.data;
        }
    });

    const formatSeries = (series: string) => {
        if (series.includes("-")) {
            return series.split("-")[0].toUpperCase()[0] + series.split("-")[0].substring(1) + " " + series.split("-")[1].toUpperCase()[0] + series.split("-")[1].substring(1);
        }
        return series.toUpperCase()[0] + series.substring(1) + " Series";
    }

    const toggleWishlist = async ({id} : {id: number;}) => {
      const token = await getToken();
      const resp = await post(`profiles/wishlist/?id=${id}`, {}, token);
      return resp?.data;
    }
    
    const mutation = useMutation({
      mutationFn: toggleWishlist,
      onSuccess: (data) => {
        queryClient.setQueryData(['pCollection'], data)
      },
    })

    const sortBySeries = (collectibles: PCollection[]) => {
        if (!collectibles) return (<></>);

        const collectiblesBySeries: { [key: string]: PCollection[] } = {};
        
        // group collectibles by series
        collectibles.forEach(collectible => {
            if (!collectiblesBySeries[collectible.series]) {
                collectiblesBySeries[collectible.series] = [];
            }
            collectiblesBySeries[collectible.series].push(collectible);
        });

        // render collectibles
        return Object.entries(collectiblesBySeries).map(([series, seriesCollectibles]) => (
            <div key={series} className="flex flex-wrap">
                <div className="bg-yellow-350 w-full mb-2 pl-3 text-transform: uppercase text-lg">{formatSeries(series)}</div>
                <div className="grid grid-cols-3 md:grid-cols-6">
                    {seriesCollectibles.map((collection: PCollection) => (
                        <div key={collection.id} className="w-full p-4 flex flex-col items-center"> 
                            <img src={getProductImage(collection.image)} style={{ opacity: collection.owned ? 1 : 0.3 }} className="w-50 h-50 object-cover rounded-lg" alt={collection.name} />
                            <div className="text-center">{collection.name}</div> 
                            <div onClick = {() => mutation.mutate({id: collection.id})}> 
                                {collection.wishlisted ? <FavoriteIcon className = "text-pink-400" /> : <FavoriteBorderIcon className = "text-pink-400" />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ));
    };

    return (
        // page ui
        <div className = "bg-green-150 flex flex-col justify-center h-screen w-full pl-10 pr-10">
            <div className = "flex flex-col md:flex-row md:justify-between w-full">
                <h1 className = "text-3xl text-transform: mb-5 uppercase"> Your Collection </h1>
                <div className = "flex flex-col md:flex-row md:justify-end w-full">
                    <div className = "bg-yellow-350 h-7 rounded-lg mb-5 align-center p-0.5 w-fit mr-2"> Sort </div>
                    <div className = "bg-yellow-350 h-7 rounded-lg mb-5 align-center p-0.5 w-fit"> Edit Collection </div>     
                 </div>
            </div>
            <div className = "bg-white h-4/5 w-full overflow-y-auto"> 
                {!isLoading && !isError && data ? sortBySeries(data.collectibles) : <> Loading </>}
            </div>
        </div>

    )
}

export default Collection;