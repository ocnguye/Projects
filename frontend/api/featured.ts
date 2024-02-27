import { get } from './api';

const getFeatured = async (token: any) => get('featured/', token);

export {
    getFeatured
}