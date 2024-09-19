import React, { useState } from 'react';
import { DataGrid, GridCloseIcon } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Link as MuiLink,
    Skeleton,
    Typography
} from '@mui/material';
import { SlCalender } from 'react-icons/sl';
import { MdPlace } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useGallery from "../../../hooks/useGallery";
import { GoUnverified } from 'react-icons/go';
import { Helmet } from 'react-helmet-async';

const GalleryReview = () => {
    const [gallery, loading, refetch] = useGallery();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [selectedMedia, setSelectedMedia] = useState(null);


    const pendingMedia = gallery.filter(media => media.status === 'pending');

    const handleButtonClick = (media) => {
        handleReviewCard(media);
        setSelectedMedia(null);
    };

    const handleReviewCard = (gallery) => {
        Swal.fire({
            title: 'Please check all info before confirmed',
            showDenyButton: true,
            confirmButtonText: 'Accept',
            denyButtonText: 'Decline',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/gallery/${gallery._id}`, { status: 'verified' }).then((res) => {
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire('Verified', '', 'success');
                    } else if (res.data.matchedCount === 0) {
                        Swal.fire('Failed! Try again', '', 'error');
                    }
                });
            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Select reason for declining',
                    input: 'select',
                    inputOptions: {
                        fake: 'Fake',
                        repeat: 'Repeat',
                        inconvenience: 'Inconvenience'
                    },
                    inputPlaceholder: 'Select a reason',
                    showCancelButton: true,
                }).then((declineResult) => {
                    if (declineResult.isConfirmed) {
                        const status = declineResult.value;
                        axiosPublic.patch(`/gallery/${gallery._id}`, { status }).then((res) => {
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire('Declined', '', 'success');
                            } else if (res.data.matchedCount === 0) {
                                Swal.fire('Failed! Try again', '', 'error');
                            }
                        });
                    }
                });
            }
        });
    };

    const columns = [
        { field: 'id', headerName: 'Sl.', width: 55 },
        {
            field: 'name',
            headerName: 'Media (Click to show)',
            width: 200,
            renderCell: (params) => (
                <div>
                    {params.row.url ? (
                        <div
                            key={params.row.url}
                            className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                            onClick={() => setSelectedMedia(params.row)}
                        >
                            {params.row.url.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
                                <img
                                    src={params.row.url}
                                    alt={`Image`}
                                    className="w-[90px] h-[90px] object-contain"
                                />
                            ) : (
                                <video
                                    className="w-[90px] h-[90px] object-contain"
                                    src={params.row.url}
                                />
                            )}
                        </div>
                    ) : (
                        <Typography variant="body2">No media</Typography>
                    )}

                    {/* Popup for Full-Size Media */}
                    <Dialog open={Boolean(selectedMedia)} onClose={() => setSelectedMedia(null)} fullWidth maxWidth="md">
                        <DialogTitle className='border-b-2 border-gray-100'>Genocide 2024</DialogTitle>
                        <IconButton
                            color="inherit"
                            onClick={() => setSelectedMedia(null)}
                            aria-label="close"
                            style={{ position: 'absolute', top: 10, right: 10 }}
                        >
                            <GridCloseIcon />
                        </IconButton>
                        <DialogContent>
                            {selectedMedia && (
                                <div className="">
                                    <div className='relative'>
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-2 opacity-90 font-bold text-white text-sm rounded-br-lg">
                                            www.genocide2024.info
                                        </div>
                                        <div className="w-full h-auto max-w-screen-lg mx-auto">
                                            {selectedMedia.url.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
                                                <img
                                                    src={selectedMedia.url}
                                                    alt="Selected"
                                                    className="w-full h-auto max-h-96 object-contain rounded-md"
                                                />
                                            ) : (
                                                <video
                                                    className="w-full h-auto max-h-svh object-contain rounded-md"
                                                    controls
                                                    src={selectedMedia.url}
                                                />
                                            )}
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
                        </DialogContent>
                        <Button onClick={() => handleButtonClick(params.row)} className="btn btn-ghost btn-lg bg-slate-400">
                            <GoUnverified className="text-3xl text-red-600" />
                        </Button>
                    </Dialog>
                </div>
            ),
        },
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'place', headerName: 'Place', width: 150 },
        { field: 'description', headerName: 'Description', width: 250 },
        {
            field: 'actions',
            headerName: 'Review',
            width: 80,
            renderCell: (params) => (
                <Button onClick={() => handleReviewCard(params.row)} className="btn btn-ghost btn-lg">
                    <GoUnverified className="text-3xl text-red-600 -mt-4" />
                </Button>
            ),
        },
    ];

    const rows = pendingMedia.flatMap((media, index) =>
        media.mediaUrls.length === 1
            ? [{
                id: `${index + 1}.`, // Simple index for single URL
                _id: media._id,
                url: media.mediaUrls[0], // Single URL
                description: media.description,
                place: media.place,
                date: media.date,
            }]
            : media.mediaUrls.map((url, urlIndex) => ({
                id: `${index + 1}.${urlIndex + 1}`, // Composite index for multiple URLs
                _id: media._id,
                url,
                description: media.description,
                place: media.place,
                date: media.date,
            }))
    );

    return (
        <Box padding={1} bgcolor="background.paper">
            <Helmet>
                <title>Review Gallery - GENOCIDE 2024</title>
            </Helmet>

            <Box display="flex" justifyContent="center" mt={1} mb={2}>
                <Typography variant="h5" color="textPrimary">Total Pending Forms: <span className='italic font-bold'>{pendingMedia.length}</span></Typography>
            </Box>
            <Box
                sx={{
                    height: '80vh',
                    width: '100%',
                    overflow: 'auto',
                    '@media (max-width:600px)': {
                        height: '70vh',
                    },
                    paddingX: '8px',
                    marginTop: '12px',
                    marginBottom: '16px',
                }}
            >
                {loading ? (
                    <div className='mt-8 mb-12'>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {[...Array(10)].map((_, index) => (
                                <Box key={index} sx={{ mb: 1, width: '100%' }}>
                                    <Skeleton variant="rectangular" height={70} />
                                </Box>
                            ))}
                        </Box>
                    </div>
                ) : (
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={25} // Set initial page size to 50
                        rowsPerPageOptions={[10, 25, 50]} // Provide options for 10, 25, and 50 rows per page
                        components={{
                            NoRowsOverlay: () => (
                                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                                    No data available
                                </Typography>
                            ),
                            LoadingOverlay: () => (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <CircularProgress />
                                </Box>
                            ),
                        }}
                    />
                )}
            </Box>
        </Box>
    );
};

export default GalleryReview;
