import axios from "axios";
import { getUrl } from "../api/s3";

export async function postImgToS3(file: any, token: any): Promise<string> {
    const response = await getUrl(token);
    if (response === undefined) return "";

    const { url, fields } = response.data;
    const payload = new FormData();

    Object.entries(fields).forEach(([key, value]: any) => {
        payload.append(key, value);
    });
    payload.append("file", file);
    payload.append("Content-Type", file.type);

    try {
        await axios.post(url, payload);
    } catch (error) {
        console.error("Error posting image to S3: ", error);
        return "";
    }
    const imgUrl = url + fields.key;
    return imgUrl;
}