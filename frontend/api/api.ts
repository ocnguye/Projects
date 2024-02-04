import axios from 'axios';

// const baseURL = 'http://localhost:8000/api/';
const baseURL = 'https://angel-backend.fly.dev/api/';


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
  
  export { get, post, del };