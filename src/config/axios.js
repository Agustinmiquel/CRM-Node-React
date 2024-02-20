import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL

const clienteAxios = axios.create({
    baseURL: baseURL,
})

export default clienteAxios;