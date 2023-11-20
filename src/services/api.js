// import axios from 'axios';

 // Replace with your API base URL
import axios from "axios";
import * as securedLocalStorage from "./secureLocalStorage";
// const BASE_URL = 'http://139.59.46.40:8000';
export const apiRequest = async(reqObj, url, type) => {
    const token = securedLocalStorage.get("token");
    return await axios({
        url: url,
        method: type,
        headers: {
            "token": token,
            "Authorization": "1",
            "Access-Control-Allow-Origin": "http://treeviewdatamapping-env.eba-jsbuwrm8.us-east-2.elasticbeanstalk.com/",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, *",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
            "Access-Control-Allow-Credentials": true,
        },
        data: reqObj,
    })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
}
// Create an Axios instance with default configurations
// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'multipart/form-data'
//   },
// });

// // Interceptor to add the Bearer token to requests
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `${token}`;
//   }
//   return config;
// });

// export async function apiRequest(endpoint, method, data = null, formData = null) {
//   try {
//     const requestData = new FormData();
//     if (formData) {
//       for (const [key, value] of formData.entries()) {
//         requestData.append(key, value);
//       }
//     }
//     const response = await api.request({
//       url: `/${endpoint}`,
//       method,
//       data: requestData

//     });
//     if (response.status === 401) {
//       return null;
//     }

//     if (response.status >= 400) {
//       return response;
//     }

//     return response.data;
//   } catch (error) {
//     return error.response?.data;
//   }
// }
