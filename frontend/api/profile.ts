import { get, post } from "./api";

const getProfile = async (token: any) => get("profiles/", token);
const postTrade = async (token: any, data: any) => post("profiles/trades/", data, token);

export { 
    getProfile,
    postTrade,
};