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
        // Initialize with all cards if no filter is applied
        setFilteredCards(cards);
    }, [cards]);

    return (
        <div>
            <Helmet>
                <title>Home - GENOCIDE</title>
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
                <div className="flex justify-between items-center md:px-10 mt-16 md:mt-12 mb-0 md:mb-2 py-2">
                    <div className="p-4">
                        <h2 className="text-2xl font-bold text-gray-700 md:text-4xl ">আন্দোলনে <br className="md:hidden" /> <span className="text-red-700">শহীদদের</span> তালিকা</h2>
                    </div>
                    <div className="mr-1">
                        {/* TODO: implement search functionalities not properly working */}
                        <SearchBar setFilteredCards={setFilteredCards} allCards={cards} loading={loading} />
                    </div>
                </div>
            </div>
            <div className="max-w-screen-2xl mx-auto divider divider-end -mt-4"></div>
            <div className="max-w-screen-xl mx-auto px-2 md:px-10">
                <DataSection filteredCards={filteredCards} loading={loading} />
            </div>
        </div>
    );
};

export default Home;
