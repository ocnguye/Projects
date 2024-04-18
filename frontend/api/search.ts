import { get } from './api';

export type Collectible = {
    id: number,
    name: string,
    series: string,
    image: string,
    product: string,
}

export type Listing = {
    id: number,
    collectible: Collectible,
    available: boolean,
    price: number,
    description: string,
    images: string,
    verified: boolean,
    user: Profile,
}

export type Trade = {
    id: number,
    profileOne: Profile,
    profileTwo: Profile,
    givingOne: Listing[],
    givingTwo: Listing[],
    status: number,
    profileOneAccepted: boolean,
    profileTwoAccepted: boolean,
}

export type Profile = {
    id: number,
    bio: string,
    collection: Listing[],
    wishlist: Collectible[],
    trades: Trade[],
    rating: number,
    raters: number,
    username: string,
    profile_img: string,
    user: User,
}

export type SearchData = {
    results: number,
    listings: Listing[],
    series: string[],
}

export type User = {
    id: number,
    username: string,
    email: string,
}


const searchCollectibles = async (searchTerm: string, token: any) => await get(`search?search=${searchTerm}`, token);


export {
    searchCollectibles,
}