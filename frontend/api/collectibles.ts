import { get } from './api';
import { Collectible, Listing } from './search';

export type CollectibleIdData = {
    collectible: Collectible,
    listings: Listing[],
    results: number,
}

const getCollectibles = async (token: any) => get('collectibles', token);
const getCollectible = async (id: string, token: any) => get(`collectibles/id?id=${id}`, token);

export {
    getCollectibles,
    getCollectible,
}