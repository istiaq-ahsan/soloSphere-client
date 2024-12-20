import axios from "axios";
import UseAuth from "./UseAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})



const UseAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = UseAuth()

    useEffect(() => {
        axiosSecure.interceptors.response.use(
            res => {
                return res
            }, async error => {
                if (error.response.status === 401 || error.response.status === 403) {
                    logOut()
                    navigate('/login')
                }
            }
        )
    }, [logOut, navigate])
    return axiosSecure
};

export default UseAxiosSecure;