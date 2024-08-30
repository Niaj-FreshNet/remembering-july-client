import { useLoaderData } from "react-router-dom";
import ShaheedCard from "../../../components/ShaheedCard/ShaheedCard";
import { useEffect, useState } from "react";
import useCards from "../../../hooks/useCards";

const Cards = () => {
    // const loadedCards = useLoaderData();
    // const [cards, setCards] = useState(loadedCards);

    // useEffect(() => {
    //     fetch('http://localhost:5000')
    //     .then(res => res.json())
    //     .then(data => {
    //         setCards(data)
    //     })
    // }, [])

    const [cards] = useCards();

    return (
        <>
            <div className="">
                <div className='grid md:grid-cols-3 gap-3 mt-5'>
                    {
                        cards.map(card => <ShaheedCard
                            key={card._id}
                            card={card}
                            cards={cards}
                        // setCards={setCards}
                        ></ShaheedCard>)
                    }
                </div>
            </div>
        </>
    );
};

export default Cards;