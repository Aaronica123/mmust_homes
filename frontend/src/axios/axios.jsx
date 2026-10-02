import axios from "axios";

const axios_client=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    withCredentials:true,
    
});
export default axios_client;