// Where we will define our API calls to the backend
import { get, post } from './api';

const getCollectibles = async (token: any) => get('collectibles/', token);
const postCollectible = async (payload: any, token: any) => post('collectibles/', payload, token);

export {
    getCollectibles,
    postCollectible,
}