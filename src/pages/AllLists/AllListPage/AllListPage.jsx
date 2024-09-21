import React, { Suspense } from 'react';
import useCards from '../../../hooks/useCards';
import { Skeleton } from '@mui/material';
import { Helmet } from 'react-helmet-async';
// import AllListTab from '../AllListTab/AllListTab';


const AllListTab = React.lazy(() => import('../AllListTab/AllListTab'));


const LoadingSkeleton = () => (
    <div className="flex justify-center">
        <div className="grid grid-cols-2 mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-x-2 md:gap-x-4 gap-y-4 mt-28 mb-8">
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

function App() {

    const [cards, loading] = useCards();

    return (
        <div className='max-w-screen-xl mx-auto px-1 md:px-10'>
            <Helmet>
                <title>All List - GENOCIDE 2024</title>
            </Helmet>
            {
                loading ? (
                    <LoadingSkeleton />
                ) : (
                    <Suspense fallback={<LoadingSkeleton />}>
                        <AllListTab cards={cards} />
                    </Suspense>
                )
            }
        </div>
    );
}

export default App;
