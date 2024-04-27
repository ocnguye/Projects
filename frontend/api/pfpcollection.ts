import {get} from "./api"

const getProfileCollection = async (id: string, token: any) => get(`profiles/trades/?id=${id}`, token);

export {getProfileCollection}
