import {getProfileCollection} from "../../api/pfpcollection"
import {useAuth} from "@clerk/clerk-react"
import {useQuery} from "@tanstack/react-query"
import {getProductImage} from "../../utils/images"


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
}

const Collection = () => {
    const { getToken } = useAuth();

    const { data, isLoading, isError } = useQuery<CollectionData>({
        queryKey: ['profile'],
        queryFn: async () => {
            const token = await getToken();
            const resp = await getProfileCollection(token);
            return resp!.data;
        } 
    });

    const formatSeries = ( series: string ) => {
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
        return Object.entries(collectiblesBySeries).map(([series, seriesCollectibles]) => (
            <div key={series} className="flex flex-wrap">
                <div className="bg-yellow-350 w-full mb-2 pl-3 text-transform: uppercase text-lg">{formatSeries(series)}</div>
                {seriesCollectibles.map((collection: PCollection) => (
                    <div key={collection.id} className="w-1/6 p-4 flex flex-col items-center"> 
                        <img src={getProductImage(collection.image)} className={`w-50 h-50 object-cover rounded-lg opacity-${collection.owned ? "100" : "30"}`} alt={collection.name} />
                        <div className="text-center">{collection.name}</div> 
                    </div>
                ))}
            </div>
        ));
    };

    return (
        // page ui
        <div className = "bg-green-150 flex flex-col justify-center h-screen w-screen pl-10 pr-10">
            <div className = "flex flex-row justify-between w-full">
                <h1 className = "text-6xl mb-8"> Your Collection </h1>
                <div className = "flex">
                    <div className = "bg-yellow-350 h-7 rounded-lg align-center p-0.5"> Edit Collection </div>
                </div>
            </div>
            <div className = "bg-white h-4/5 w-full overflow-y-auto"> 
                {!isLoading && !isError && data ? sortBySeries(data.collectibles) : <> Loading </>}
            </div>
        </div>

    )
}

export default Collection;