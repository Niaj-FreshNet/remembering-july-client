import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bloodybd from '../../../assets/bloodybd.webp';
import { Skeleton } from '@mui/material';

const Banner = () => {
    const [loading, setLoading] = useState(false);

    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <div className="relative">
            {loading && <Skeleton variant="rectangular" width="100%" height="00px" />}
            <Carousel
                showThumbs={false}
                autoPlay={true}
                interval={3000}
                infiniteLoop={true}
                showStatus={false}
                showIndicators={false}
                className="relative"
            >
                <div className="relative overflow-hidden">
                    <img
                        src={bloodybd}
                        alt="Bloody Bangladesh"
                        className={`object-contain h-full w-full ${loading ? 'hidden' : 'block'}`}
                        onLoad={handleImageLoad}
                    />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
