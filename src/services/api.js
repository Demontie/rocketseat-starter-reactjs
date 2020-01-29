import axios from "axios";

//Api do node
const api = axios.create({baseURL: 'http://localhost:5000/api/'});

export default api;