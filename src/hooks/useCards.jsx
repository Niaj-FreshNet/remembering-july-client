import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCards = () => {
    const axiosPublic = useAxiosPublic();

    const {data: cards = [], isPending: loading, refetch} = useQuery({
        queryKey: ['cards'],
        queryFn: async () => {
            const res = await axiosPublic.get('/cards');
            return res.data;
        }
    })
    return [cards, loading, refetch];
};

export default useCards;