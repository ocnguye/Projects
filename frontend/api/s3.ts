import { get } from './api';

const getUrl = async (token: any) => get('s3', token);

export {
    getUrl,
}