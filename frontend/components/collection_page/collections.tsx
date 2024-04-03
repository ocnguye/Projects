import {getProfileCollection} from "../../api/pfpcollection"
import {useAuth} from "@clerk/clerk-react"
import {useQuery} from "@tanstack/react-query"


type CollectionData = {
    collection: Collectible[],
}

type Collectible = {
    id: number,
    product: string,
    series: string,
    name: string,
    image: string,
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
    return (
        // page ui
        <div className = "bg-green-150 flex flex-col justify-center h-screen w-screen pl-10">
            <div className = "flex flex-row spacee-x-6 ">
                <h1 className = "text-6xl mb-8"> Your Collection </h1>
                
                <div className = "bg-yellow-350 h-7 rounded-lg align-center p-0.5"> Sort By: </div>
                
                 {/* {!isLoading && !isError ? } */}
            </div>
            <div className = "bg-white h-4/5 w-3/4"> 
                     
                </div>
        </div>

    )
}

export default Collection;