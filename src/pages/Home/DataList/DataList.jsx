import dayjs from "dayjs";
import DataCard from "../../../components/DataCard/DataCard";

const DataList = ({ cards }) => {
    // Filter cards to include only those with status "শহীদ" and "verified"
    const filteredCards = cards.filter(card => 
        card.category === "শহীদ" && card.status === "verified"
    );

    // Sort filtered cards by date (oldest first)
    const sortedCards = [...filteredCards].sort((a, b) => {
        const dateA = dayjs(a.date, 'D MMMM, YYYY');
        const dateB = dayjs(b.date, 'D MMMM, YYYY');
        return dateA - dateB;
    });

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-x-3 gap-y-3 px-2 my-10">
            {
                sortedCards.map((card, index) =>
                    <DataCard
                        key={card._id}
                        card={card}
                        index={index + 1}
                    />
                )
            }
        </div>
    );
};

export default DataList;
