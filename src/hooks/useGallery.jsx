import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGallery = () => {
    const axiosPublic = useAxiosPublic();

    const {data: gallery = [], isLoading: loading, refetch} = useQuery({
        queryKey: ['gallery'],
        queryFn: async () => {
            const res = await axiosPublic.get('/gallery');
            return res.data;
        }
    })
    return [gallery, loading, refetch];
    
};

export default useGallery;