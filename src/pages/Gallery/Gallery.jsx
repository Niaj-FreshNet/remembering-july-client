import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SlCalender } from 'react-icons/sl';
import { MdPlace } from 'react-icons/md';
import { CiShare2 } from 'react-icons/ci';
import { FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from "react-share";
import { FaFacebook } from 'react-icons/fa';
import useGallery from '../../hooks/useGallery';

const Gallery = () => {
    const [gallery, loading, refetch] = useGallery();
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [showShareOptions, setShowShareOptions] = useState(false);

    const verifiedMedia = gallery.filter(media => media.status === 'verified');

    const handleShareClick = () => {
        setShowShareOptions(!showShareOptions);
    };

    const shareUrl = `${window.location.origin}/gallery`;
    const title = `${"GENOCIDE 2024"} - ${"GENOCIDE 2024"} at ${"GENOCIDE 2024"}`;

    return (
        <div>
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 md:gap-x-3 gap-y-4 md:gap-y-6 mt-6">
                {verifiedMedia.map((item) =>
                    item.mediaUrls?.map((url, index) => (
                        <div
                            key={index}
                            className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                            onClick={() => setSelectedMedia({ url, description: item.description, date: item.date, place: item.place })}
                        >
                            {url.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
                                <img
                                    src={url}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            ) : (
                                <video
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    src={url}
                                    // controls
                                />
                            )}
                            <div className='absolute bottom-0 left-0 text-sm font-semibold text-gray-700 bg-white rounded-tr-md px-2 opacity-90 group-hover:opacity-100 transition-opacity duration-300'>
                                {item.date}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Popup for Full-Size Media */}
            <Dialog open={Boolean(selectedMedia)} onClose={() => setSelectedMedia(null)} fullWidth maxWidth="md">
                <DialogTitle className='border-b-2 border-gray-100'>
                    Genocide 2024
                </DialogTitle>
                <IconButton
                    color="inherit"
                    onClick={() => setSelectedMedia(null)}
                    aria-label="close"
                    style={{ position: 'absolute', top: 10, right: 10 }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    {selectedMedia && (
                        <div className="">
                            <div className='relative'>
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-2 opacity-90 font-bold text-white text-sm rounded-br-lg">
                                    www.genocide2024.info
                                </div>
                                <div className="w-full h-auto max-w-screen-lg mx-auto">
                                    {
                                        selectedMedia.url.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
                                            <img
                                                src={selectedMedia.url}
                                                alt="Selected"
                                                className="w-full h-auto max-h-96 object-contain rounded-md transition-transform duration-300 hover:scale-105"
                                            />
                                        ) : (
                                            <video
                                                className="w-full h-auto max-h-svh object-contain rounded-md transition-transform duration-300 hover:scale-105"
                                                controls
                                                src={selectedMedia.url}
                                            />
                                        )
                                    }
                                </div>
                            </div>

                            <div className='flex justify-between px-4 py-2'>
                                <div className='flex items-center gap-2 text-sm text-gray-600'>
                                    <SlCalender />
                                    {selectedMedia.date}
                                </div>
                                <div className='flex items-center gap-2 text-sm text-gray-600'>
                                    <MdPlace />
                                    {selectedMedia.place}
                                </div>
                            </div>
                            <div className="text-sm text-black px-4 py-2 border-t-2 border-gray-100">
                                <p>{selectedMedia.description}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end items-end mt-2 mr-2">
                        <div className="flex -mb-2 space-x-2">
                            {showShareOptions && (
                                <div className="flex items-center space-x-2">
                                    <FacebookShareButton url={shareUrl} quote={title}>
                                        <FaFacebook size={28} color="#316FF6" round />
                                    </FacebookShareButton>
                                    <FacebookMessengerShareButton url={shareUrl} quote={title}>
                                        <FacebookMessengerIcon size={28} round />
                                    </FacebookMessengerShareButton>
                                    <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
                                        <WhatsappIcon size={28} round />
                                    </WhatsappShareButton>
                                    <TwitterShareButton url={shareUrl} title={title}>
                                        <XIcon size={28} round />
                                    </TwitterShareButton>
                                </div>
                            )}
                            <Button onClick={handleShareClick} size="2px" color="primary" sx={{ border: 0 }}>
                                <CiShare2 size={30} />
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Gallery;
