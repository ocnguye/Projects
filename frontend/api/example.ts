// Where we will define our API calls to the backend
import { get } from './api';

const getCollectibles = async (token: any) => get('collectibles/', token);

const getProfile = async (token: any) => get('profiles/', token);

export {
    getCollectibles,
    getProfile,
}