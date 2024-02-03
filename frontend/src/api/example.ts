// Where we will define our API calls to the backend
import { get, post, del } from './api';

const getCollectibles = async (token: any) => get('collectibles/', token);

export {
    getCollectibles,
}