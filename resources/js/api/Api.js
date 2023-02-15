import axios from "axios";
import cookie from 'js-cookie'
let baseURL =
    import.meta.env.VITE_APP_BASE_URL;
import { Inertia } from "@inertiajs/inertia";

let token = cookie.get('XSRF-TOKEN')
let Api = axios.create({
    baseURL: `${baseURL}/api`,
    'Authorization': `${token}`,
    withCredentials: true
})

Api.interceptors.response.use(function(response) {
    return response
}, function(error) {
    if (error.response.status === 401 || error.response.status === 419) {
        Inertia.get('/');
    } else if (error.response.status === 403) {
        alert('not enough priviledges')
    } else {
        return Promise.reject(error);
    }
});


export default Api;