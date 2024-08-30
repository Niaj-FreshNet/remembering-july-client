import ShaheedCard from "../../components/ShaheedCard/ShaheedCard";
import useCards from "../../hooks/useCards";

const Shaheed = () => {
    const [cards] = useCards();

    return (
        <div className="grid md:grid-cols-3 my-6">
            {
                cards.map(card => <ShaheedCard
                    key={card}
                    card={card}
                ></ShaheedCard>)
            }
        </div>
    );
};

export default Shaheed;