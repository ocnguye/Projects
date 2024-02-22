import React from 'react';
import { useAuth } from "@clerk/clerk-react";
import { getCollectibles, getProfile } from '../api/example';
import { useQuery } from '@tanstack/react-query';
import Button from '@mui/material/Button'

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
    console.log(data);
    return (
        <div>
            <h1>Testing</h1>
            <p>This is an test component.</p>
            { !isLoading && !isError ?
                <div>
                    {/* <p>{data}</p> */}
                    {/* <p>{data.wishlist}</p> */}
                </div>
            : 
            (<></>)}
        </div>
    );
}