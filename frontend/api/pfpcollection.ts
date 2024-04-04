import {get} from "./api"

const getProfileCollection = async (token: any) => get("profiles/trades", token);

export {getProfileCollection}

/*userId: string --- put this after token: any
 `?userId=${userId}` --- append this to profiles/trades and change "" to `` */