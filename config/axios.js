import axios from 'axios';
const clientesAxios = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BACKEND_URL
})

export default clientesAxios;