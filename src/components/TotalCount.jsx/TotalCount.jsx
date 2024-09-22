import React, { useEffect, useState } from "react";
import useCards from "../../hooks/useCards";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const TotalCount = () => {
    const [cards, loading, refetch] = useCards();
    const [countsLoading, setCountsLoading] = useState(true);

    useEffect(() => {
        if (!loading) {
            setCountsLoading(false);
        }
    }, [loading]);

    const VerifiedShaheedCards = cards.filter(card => card.status === 'verified' && card.category === 'শহীদ');
    const verifiedInjuredCards = cards.filter(card => card.status === 'verified' && card.category === 'আহত');
    const verifiedMissingCards = cards.filter(card => card.status === 'verified' && card.category === 'নিখোঁজ');    

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/all');
        window.scrollTo(0, 0);
    }

    return (
        <div className="flex drop-shadow-lg shadow-green-900">
            <div className="label flex flex-col items-center rounded-bl-2xl w-1/3 bg-red-700 px-4 py-2">
                <div className="badge font-bold text-red-700 -mt-2 shadow-lg px-4 py-3">
                    শহীদ
                </div>
                <div className="text-4xl text-white mt-1 h-full font-bold text-center">
                    {/* {countsLoading ? <CircularProgress size={30} /> : VerifiedShaheedCards.length} */}
                    {countsLoading ? <CircularProgress size={30} /> : '1400+'}
                </div>
            </div>
            <div onClick={handleNavigate} className="label flex flex-col items-center w-1/3 bg-green-700 px-4 py-2">
                <div className="badge text-red-800 -mt-2 shadow-lg px-4 py-3">
                    আহত
                </div>
                <div className="text-4xl mt-1 text-white h-full font-bold text-center">
                    {/* {countsLoading ? <CircularProgress size={30} /> : verifiedInjuredCards.length} */}
                    {countsLoading ? <CircularProgress size={30} /> : '22k+'}
                </div>
            </div>
            <div onClick={handleNavigate} className="label flex flex-col items-center rounded-br-2xl rounded-br-l w-1/3 bg-black px-4 py-2">
                <div className="badge text-red-900 -mt-2 shadow-lg px-4 py-3">
                    নিখোঁজ
                </div>
                <div className="text-4xl mt-1 text-white h-full font-bold text-center">
                    {countsLoading ? <CircularProgress size={30} /> : verifiedMissingCards.length}
                </div>
            </div>
        </div>
    );
};

export default TotalCount;
