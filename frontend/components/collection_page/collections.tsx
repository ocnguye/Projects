import { getProfileCollection } from "../../api/pfpcollection"
import { useAuth } from "@clerk/clerk-react"
import { useQuery } from "@tanstack/react-query"
import { Listing } from "../../api/search"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type CollectionData = {
    collection: Listing[],
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

    const formatSeries = (series: string) => {
        if (series.includes("-")) {
            return series.split("-")[0].toUpperCase()[0] + series.split("-")[0].substring(1) + " " + series.split("-")[1].toUpperCase()[0] + series.split("-")[1].substring(1);
        }
        return series.toUpperCase()[0] + series.substring(1) + " Series";
    }
    const cleanImage = (image: string) => {
        const cdn = "https://d3jvwclgjetaaw.cloudfront.net/";
        image = image.replace("[", "").replace("]", "").replace("'", "").replace("'", "").split(" ")[0].replace(",", "");
        image = cdn + image.split("/")[image.split("/").length - 1];
        return image;
    }

    return (
        // page ui
        <div className="bg-transparent flex flex-col justify-center h-screen w-screen pl-10 pr-10">
            <div className="flex flex-row justify-between w-full">
                <h1 className="text-6xl mb-8"> Your Collection </h1>
                <div className="flex">
                    <div className="bg-green-450 h-7 rounded-lg align-center p-0.5"> Sort By
                        <KeyboardArrowDownIcon />
                    </div>
                    <div className="bg-yellow-350 h-7 rounded-lg align-center p-0.5"> Edit Collection </div>
                </div>
            </div>
            <div className="bg-white h-4/5 w-full">
                {
                    !isLoading && !isError && data ? (
                        <div className="flex">
                            {data.collection.map((listing: Listing) => (
                                <div key={listing.id} className="w-1/4 p-4">
                                    <img src={cleanImage(listing.images)} className="w-50 h-50 object-cover rounded-lg" alt={listing.collectible.name} />
                                    <div>{formatSeries(listing.collectible.series)}</div>
                                    <div> {listing.collectible.name} </div>

                                </div>

                            ))}
                        </div>
                    ) : (<> Loading </>)
                }
            </div>
        </div>

    )
}

export default Collection;