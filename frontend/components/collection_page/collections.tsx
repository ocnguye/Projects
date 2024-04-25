import { getProfileCollection } from "../../api/pfpcollection";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getProductImage } from "../../utils/images";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { post } from "../../api/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InsertLinkIcon from '@mui/icons-material/InsertLink';


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
    const { id: urlId } = useParams<{id: string}>();
    const { user: myUser } = useClerk();
    const [editable, setEditable] = useState(false);
    
    useEffect(() => {
        if (myUser?.id === urlId) setEditable(true); 
        else setEditable(false);
    }, [myUser, urlId]);
    
    const { data, isLoading, isError } = useQuery<CollectionData>({
        queryKey: ['pCollection', urlId],
        queryFn: async () => {
            if (urlId === undefined) return undefined;
            const token = await getToken();
            const resp = await getProfileCollection(urlId, token);
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
      const resp = await post(`profiles/wishlist/?id=${urlId}&cId=${id}`, {}, token);
      return resp?.data;
    }
    
    const mutation = useMutation({
      mutationFn: toggleWishlist,
      onSuccess: (data) => {
        queryClient.setQueryData(['pCollection', urlId], data)
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
        return (
        <div className="w-full h-full rounded-lg overflow-y-auto">
          {Object.entries(collectiblesBySeries).map(([series, seriesCollectibles]) => (
            <div key={series} className="flex flex-col">
                <p className="bg-yellow-350 w-full mb-2 pl-3 uppercase text-lg">{formatSeries(series)}</p>
                <div className="grid grid-cols-3 md:grid-cols-6 w-full">
                    {seriesCollectibles.map((collection: PCollection) => (
                        <div key={collection.id} className="w-full p-4 flex flex-col items-center"> 
                            <div className="w-50 h-50">
                                <img src={getProductImage(collection.image)} style={{ opacity: collection.owned ? 1 : 0.3 }} className="w-full object-cover rounded-lg" alt={collection.name} />
                            </div>
                            <div className="text-center">{collection.name}</div> 
                            { editable && <div onClick = {() => mutation.mutate({id: collection.id})}> 
                                {collection.wishlisted ? <FavoriteIcon className = "text-pink-400" /> : <FavoriteBorderIcon className = "text-pink-400" />}
                            </div> }
                        </div>
                    ))}
                </div>
            </div>
        ))}
        </div>)
    };

    return (
        // page ui
        <section className="flex flex-col w-full h-full overflow-y-auto bg-green-150 p-5 my-3 rounded-lg">
          <div className="flex flex-row w-full justify-between align-center pb-3">
            {editable ? 
              <h1 className="text-3xl uppercase flex-1 pb-2"> Your Collection </h1> :
              <h1 className="text-3xl uppercase flex-1 pb-2"> Collection </h1> 
            }
            <div
              className="flex justify-center items-center align-text-top px-2 text-sm bg-green-350 text-black rounded-full transition duration-300 ease-in-out hover:bg-green-450 outline outline-green-450 outline-3 hover:cursor-pointer"
              onClick={() => navigator.clipboard.writeText(window.location.href)}
            ><InsertLinkIcon /> Copy Link</div>
          </div>
          <div className="flex flex-col w-full bg-white rounded-lg">
            {!isLoading && !isError && data ? sortBySeries(data.collectibles) : <> Loading </>}
          </div>
        </section>
    )
}

export default Collection;