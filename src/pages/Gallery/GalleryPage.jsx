import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Upload from './Upload';
import './gallery.css'; // Ensure this import is at the top
import { Skeleton } from '@mui/material';
import useGallery from '../../hooks/useGallery';


const Gallery = React.lazy(() => import('./Gallery'));


const LoadingSkeleton = () => (
    <div className="flex justify-center">
        <div className="grid grid-cols-2 mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-x-2 md:gap-x-4 gap-y-4 my-8">
            {Array.from(new Array(20)).map((_, index) => (
                <Skeleton
                    key={index}
                    animation="wave"
                    variant="rectangular"
                    className="rounded-lg mx-auto"
                    width={210}
                    height={300}
                />
            ))}
        </div>
    </div>
)


const GalleryPage = () => {
    const [gallery, loading, refetch] = useGallery();

    return (
        <div className="gallery-container">
            <Helmet>
                <title>Gallery - GENOCIDE 2024</title>
            </Helmet>
            <div className="">
                <Upload />
            </div>
            <div className="mx-auto mt-10 mb-10 md:4 lg:px-8">
                <div className='underline text-center'>
                    <h2 className='text-3xl font-semibold text-white'>Genocide Gallery 2024</h2>
                </div>
                <div>
                    {
                        loading ? (
                            <LoadingSkeleton />
                        ) : (
                            <Suspense fallback={<LoadingSkeleton />}>
                                <Gallery />
                            </Suspense>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default GalleryPage;
