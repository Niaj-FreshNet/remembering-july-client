import React, { Suspense, useEffect, useState } from "react";
import useCards from "../../../hooks/useCards";
import { Skeleton } from "@mui/material";


const DataList = React.lazy(() => import('../DataList/DataList'));


const LoadingSkeleton = () => (
    <div className="flex justify-center">
        <div className="grid grid-cols-2 mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-x-2 md:gap-x-4 gap-y-4 my-8">
            {Array.from(new Array(20)).map((_, index) => (
                <Skeleton
                    key={index}
                    animation="wave"
                    variant="rectangular"
                    className="rounded-lg mx-auto"
                    style={{ 
                        // borderRadius: '8px', 
                        backgroundColor: 'lightgray', // Adjust the background color
                        width: '210px',
                        height: '300px'
                      }}
                />
            ))}
        </div>
    </div>
)


const DataSection = ({ filteredCards }) => {

    const [cards, loading] = useCards();
    const displayedCards = filteredCards.length > 0 ? filteredCards : cards;
    

    return (
        <div>
            {
                loading ? (
                    <LoadingSkeleton />
                ) : (
                    <Suspense fallback={<LoadingSkeleton />}>
                        <DataList cards={displayedCards} />
                    </Suspense>
                )
            }
        </div>
    );
};

export default DataSection;