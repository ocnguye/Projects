// Where we will define most of the apps components
import React from 'react';
import { auth } from "@clerk/nextjs";
import { getCollectibles } from '@/api/example';

export default async function Example() {
    const { getToken } = auth();
    const token = await getToken();
    const data: any = await getCollectibles(token).then((res: any) => res?.data);
    

    return (
        <div className="text-blue-600">
        <h1>Example</h1>
        <p>This is an example component.</p>
        { data ?
            (<ul>{data.map((item: any) => (
                <li className='border-4 border-light-blue-500' key={item.id}>
                    <p>{item.series}</p>
                    <p>{item.name}</p>
                    <p>{item.description}</p>
                </li>
            ))}</ul>)
        : 
        (<></>)}
        </div>
    );
}