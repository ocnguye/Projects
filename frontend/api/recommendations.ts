// For the recommendations APIs
import { get } from './api';

const getWishlistRecommendations = async (token: any) => get('recommendations/wishlist/', token);
const getMFCRecommendations = async (token: any) => get('recommendations/mfc/', token);

export {
    getWishlistRecommendations,
    getMFCRecommendations
}