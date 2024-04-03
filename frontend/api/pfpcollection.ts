import {get} from "./api"

const getProfileCollection = async (token: any) => get("profiles/collection", token);

export {getProfileCollection}