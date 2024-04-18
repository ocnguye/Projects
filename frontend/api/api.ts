import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL;
const chatURL = import.meta.env.VITE_CHAT_URL;

const get = async (url: string, token: any) => {
    const apiUrl = `${baseURL}${url}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  };

const getChat = async (url: string, token: any) => {
    const apiUrl = `${chatURL}${url}`;
    try {
        const response = await axios.get(apiUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        return response;
    } catch (err) {
        console.log(err);
    }
};

const postChat = async (url: string, payload: any, token: any) => {
    const apiUrl = `${chatURL}${url}`;
    try {
      const response = await axios.post(apiUrl, payload, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
          maxContentLength: 100000000,
          maxBodyLength: 1000000000
      });
      return response;
  
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  
  const post = async (url: string, payload: any, token: any) => {
    const apiUrl = `${baseURL}${url}`;
    try {
      const response = await axios.post(apiUrl, payload, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
          maxContentLength: 100000000,
          maxBodyLength: 1000000000
      });
      return response;
  
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  
  const del = async (url: string, payload: any, token: any) => {
      const apiUrl = `${baseURL}${url}`;
      try {
        const response = await axios.delete(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            maxContentLength: 100000000,
            maxBodyLength: 1000000000,
            data: payload,
        });
        return response;
      } catch (err) {
        console.error(JSON.stringify(err, null, 2));
      }
    };
  
  export { get, post, del, getChat, postChat };