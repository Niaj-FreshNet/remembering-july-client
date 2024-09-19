import React, { useState, useEffect } from "react";
import useCards from "../../../hooks/useCards";
import Banner from "../Banner/Banner";
import TotalCount from "../../../components/TotalCount.jsx/TotalCount";
import SearchBar from "../../../components/Search/Search";
import DataSection from "../DataSection/DataSection";
import { Helmet } from "react-helmet-async";

const Home = () => {
    const [cards, loading] = useCards();
    const [filteredCards, setFilteredCards] = useState([]);

    useEffect(() => {
        if (cards !== filteredCards) {
            setFilteredCards(cards);
        }
    }, [cards, filteredCards]);

    return (
        <div>
            <Helmet>
                <title>Home - GENOCIDE 2024</title>
            </Helmet>
            <div className="max-w-screen-2xl mx-auto relative">
                <div className="">
                    <Banner />
                </div>
                <div className="absolute -bottom-18 md:-bottom-8 lg:-bottom-4 xl:-bottom-10 left-0 right-0">
                    <TotalCount />
                </div>
            </div>
            <div className="max-w-screen-xl mx-auto">
                <div className="flex justify-between items-center md:px-10 mt-20 md:mt-12 mb-0 md:mb-2 py-2">
                    <div className="p-4">
                        <h2 className="text-3xl font-bold text-gray-100 md:text-4xl "> <span className="text-red-600 font-extrabold">শহীদি</span> মিছিল</h2>
                    </div>
                    <div className="mr-1">
                        {/* TODO: implement search functionalities not properly working */}
                        <SearchBar setFilteredCards={setFilteredCards} allCards={cards} loading={loading} />
                    </div>
                </div>
            </div>
            <div className="max-w-screen-2xl mx-auto divider divider-end -mt-6"></div>
            <div className="max-w-screen-xl mx-auto px-1 -mt-4 md:px-10 ">
                <DataSection filteredCards={filteredCards} loading={loading} />
            </div>
        </div>
    );
};

export default Home;
