import dayjs from "dayjs";
import DataCard from "../../../components/DataCard/DataCard";

const DataList = ({ cards }) => {

    // Sort cards by date (oldest first)
    const sortedCards = [...cards].sort((a, b) => {
        const dateA = dayjs(a.date, 'D MMMM, YYYY');
        const dateB = dayjs(b.date, 'D MMMM, YYYY');
        return dateA - dateB;
    });


    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-x-3 gap-y-3 px-2 my-10">
            {
                cards.map((card, index) =>
                    <DataCard
                        key={card.id}
                        card={card}
                        index={index + 1}
                    ></DataCard>
                )
            }
        </div>
    );
};

export default DataList;