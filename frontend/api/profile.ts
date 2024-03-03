import { get } from "./api";

const getProfile = async (token: any) => get("profiles/", token);

export { getProfile };