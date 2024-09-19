import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import useRedirectAfterLogin from "./useRedirectAfterLogin";
import { useEffect } from "react";
import useAdmin from "./useAdmin";

const axiosSecure = axios.create({
    baseURL: 'https://remembering-july-server.vercel.app',
    headers: {
        'Content-Type': 'application/json'
    }
})

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    // const [isAdmin, isAdminLoading] = useAdmin(); !!!PROHIBITED PRACTICE: it will create an infinite loop
    const navigate = useNavigate();
    const location = useLocation();


    // request interceptor to ad d authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token)
        console.log('Token:', token);
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    })

    // // interceptor 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        console.log('status code in the interceptor', status);
        // for 401 or 403 logout the user and move the user to the login page
        // if (status === 401 || status === 403) {
        //     await logOut();
        //     navigate('/');
        // }
        // return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;