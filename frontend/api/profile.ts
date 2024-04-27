import { get, post, del } from "./api";
import { Listing } from "./search";

export type ProfileData = {
  id: number,
  bio: string,
  username: string,
  profile_img: string,
  rating: number,
  raters: number,
  collection: Listing[],
  wishlist: any,
  trades: any,
  saved: Listing[],
}

const getProfile = async (id: string, token: any) => get(`profiles/?id=${id}`, token);
const postProfile = async (id: string, data: any, token: any) => post(`profiles/?id=${id}`, data, token);
const postTrade = async (token: any, data: any) => post("profiles/trades/", data, token);
const deleteListing = async (token: any, data: any) => del("profiles/trades/", data, token);

export { 
    getProfile,
    postProfile,
    postTrade,
    deleteListing,
};
