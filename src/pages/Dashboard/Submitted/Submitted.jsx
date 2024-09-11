import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Submitted = () => {
    const axiosPublic = useAxiosPublic();

    const { data: cards = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['cards'],
        queryFn: async () => {
            const res = await axiosPublic.get('/cards');
            return res.data.filter(card => !['verified', 'fake', 'repeat'].includes(card.status));
        }
    });
    return (
        <div>
            <div>
                <div className="flex justify-evenly sticky top-0 mb-8">
                    <h2 className="text-3xl">Submitted</h2>
                    <h2 className="text-3xl">Total Submits: {cards.length}</h2>
                    <button className="btn btn-primary">Pay</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-amber-300">
                            <tr>
                                <th>ক্রম</th>
                                <th>নাম</th>
                                <th>পেশা</th>
                                <th>ঘটনাস্থল</th>
                                <th>তারিখ</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {/* row */}
                        <tbody>
                            {
                                cards.map((card, index) => <tr key={card._id}>
                                    <td>{index + 1}</td>
                                    <td className="font-bold">{card.name}</td>
                                    <td>{card.occupation}</td>
                                    <td>{card.place}</td>
                                    <td>{card.date}</td>
                                    <td>{card.status}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Submitted;