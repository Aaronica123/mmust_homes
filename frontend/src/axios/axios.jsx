import axios from "axios";

const axios_client=axios.create({
    baseURL:"http://localhost:3001",
    withCredentials:true,
    
});
export default axios_client;