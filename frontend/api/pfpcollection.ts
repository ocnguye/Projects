import {get} from "./api"

const getProfileCollection = async (token: any) => get("profiles/trades", token);

export {getProfileCollection}
