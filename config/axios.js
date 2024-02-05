import axios from 'axios';
const clientesAxios = axios.create({
    baseURL: 'http://localhost:5000'
})

export default clientesAxios;