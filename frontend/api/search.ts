import { get } from './api';

export type Collectible = {
    id: number,
    name: string,
    series: string,
    image: string,
    product: string,
}

export type Trade = {
    id: number,
    trading: Collectible,
    requesting1: Collectible,
    requesting2: Collectible,
    requesting3: Collectible,
    price: number,
    description: string,
    images: string,
    verified: boolean,
}

export type SearchData = {
    results: number,
    trades: Trade[],
    series: string[],
}


const searchCollectibles = async (searchTerm: string, token: any) => await get(`search?search=${searchTerm}`, token);


export {
    searchCollectibles,
}