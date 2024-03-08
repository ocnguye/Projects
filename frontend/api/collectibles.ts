import { get } from './api';

const getCollectibles = async (token: any) => get('collectibles', token);

export {
    getCollectibles,
}