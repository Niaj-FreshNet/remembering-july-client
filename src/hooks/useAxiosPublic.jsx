import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://remembering-july-server.vercel.app',
    headers: {
        'Content-Type': 'application/json'
    }
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;