import {post} from './api'

const submitForVerification = async (token: any, data: any) => await post('verify/',data, token);

export {
    submitForVerification,
}