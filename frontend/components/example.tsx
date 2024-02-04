//@ts-nocheck
// Where we will define most of the apps components
import React from 'react';
import { useAuth } from "@clerk/clerk-react";
import { getCollectibles, postCollectible } from '../api/example';
import { useQuery } from '@tanstack/react-query';
import Button from '@mui/material/Button'

export default function Example() {
    const { getToken } = useAuth();

    const {data, isLoading, isError }: any = useQuery({
        queryKey: [],
        queryFn: async () => {
            const token = await getToken();
            const resp = await getCollectibles(token);
            return resp!.data;
        } 
    });
    const send = async () => {
        const token = await getToken();
        await postCollectible({"name": "one", "series": "one", "description": "desc"}, token);
    }
    
    return (
        <div className="text-blue-600">
        <h1>Example</h1>
        <p>This is an example component.</p>
        { !isLoading && !isError ?
            data.map((item: any) => (
                <li className='border-4 border-light-blue-500' key={item.id}>
                    <p>{item.series}</p>
                    <p>{item.name}</p>
                    <p>{item.description}</p>
                </li>
            ))
        : 
        (<></>)}
        <Button onClick={() => send()} variant="contained">Click me</Button>
        </div>
    );
}