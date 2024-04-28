import { getProfileCollection } from "../../api/pfpcollection";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import AddCollectible from "./AddCollectible";

export type CollectionData = {
    collectibles: PCollection[],
}

export type PCollection = {
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
    const { id: urlId } = useParams<{id: string}>();
    const { user: myUser } = useClerk();
    const [editable, setEditable] = useState(false);
    
    useEffect(() => {
        if (myUser?.id === undefined) return;
        myUser?.id === urlId ? setEditable(true) : setEditable(false);
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
        <div className="w-full rounded-lg overflow-y-auto">
          {Object.entries(collectiblesBySeries).map(([series, seriesCollectibles]) => (
            <div key={series} className="flex flex-col">
                <p className="bg-yellow-350 w-full mb-2 pl-3 uppercase text-lg">{formatSeries(series)}</p>
                <div className="grid grid-cols-3 md:grid-cols-6 w-full">
                    {seriesCollectibles.map((collection: PCollection) => (
                      <AddCollectible collectible={collection} id={urlId} editable={editable} />
                    ))}
                </div>
            </div>
        ))}
        </div>)
    };

    return (
        // page ui
        <section className="flex flex-col w-full h-full bg-green-150 p-5 my-3 rounded-lg">
          <div className="flex flex-row w-full space-x-5 justify-between align-center pb-3">
            {editable ? 
              <h1 className="text-2xl sm:text-3xl uppercase flex-1 pb-2"> Your Collection </h1> :
              <h1 className="text-3xl uppercase flex-1 pb-2"> Collection </h1> 
            }
            <div
              className="flex space-x-1 justify-center h-fit items-center align-text-top p-2 text-sm bg-green-350 text-black rounded-full transition duration-300 ease-in-out hover:bg-green-450 outline outline-green-450 outline-3 hover:cursor-pointer"
              onClick={() => navigator.clipboard.writeText(window.location.href)}
            >
              <InsertLinkIcon /> 
              <p className="text-sm">Copy</p>
              <p className="text-sm">Link</p>
            </div>
          </div>
          { editable ? 
            <p className="pb-2"> Add a collectible to your collection or heart a collectible to add it to your wishlist. Collectibles for listings you've posted will automatically appear in your collection. </p>
            :
            <></>
          }
          <div className="flex flex-col w-full bg-white rounded-lg">
            {!isLoading && !isError && data ? sortBySeries(data.collectibles) : <> Loading </>}
          </div>
        </section>
    )
}

export default Collection;