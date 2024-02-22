// A test component to test the various APIs calls
import { useAuth } from "@clerk/clerk-react";
import { getProfile } from '../api/example';
import { useQuery } from '@tanstack/react-query';

export default function Test() {
    const { getToken } = useAuth();

    const {data, isLoading, isError }: any = useQuery({
        queryKey: [],
        queryFn: async () => {
            const token = await getToken();
            const resp = await getProfile(token);
            return resp!.data;
        } 
    });
    return (
        <div>
            <h1>Testing</h1>
            <p>This is an test component.</p>
            { !isLoading && !isError ?
                <div>
                </div>
            : 
            (<></>)}
        </div>
    );
}