import axios from "axios";
import cookie from 'js-cookie'
let baseURL = import.meta.env.VITE_APP_BASE_URL;

let token = cookie.get('XSRF-TOKEN')
let Api = axios.create({
    baseURL: `${baseURL}/api`,
    'Authorization': `${token}`,
    withCredentials: true
})

export default Api;