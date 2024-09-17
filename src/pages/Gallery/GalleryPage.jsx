import React from 'react';
import Gallery from './Gallery';
import { Helmet } from 'react-helmet-async';
import Upload from './Upload';
import './gallery.css'; // Ensure this import is at the top

const GalleryPage = () => {
    return (
        <div className="gallery-container">
            <Helmet>
                <title>Gallery - GENOCIDE</title>
            </Helmet>
            <div className="">
                <Upload />
            </div>
            <div className="">
                <Gallery />
            </div>
        </div>
    );
};

export default GalleryPage;
