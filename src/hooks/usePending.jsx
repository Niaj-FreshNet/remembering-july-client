import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useCards from "./useCards";

const usePending = () => {
    const axiosPublic = useAxiosPublic();

    const { data: cards = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['cards'],
        queryFn: async () => {
            const res = await axiosPublic.get('/cards');
            const pendingCards = res.data.filter(card =>
                card.status === 'pending'
            );
            return pendingCards;
        },
    });

    return { pendingCards: cards, loading, refetch };
};

export default usePending;
