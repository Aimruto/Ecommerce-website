import axios from "axios";
const axiosInstance=axios.create({
    baseURL: import.meta.mode === "development"? "http://localhost:8001/api":"/api",
    withCredentials:true, //cuz we wanna send cookies to the server for authentication
});
export default axiosInstance;
