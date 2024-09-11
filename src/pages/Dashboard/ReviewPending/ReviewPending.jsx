import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Box, Button, Chip, Link as MuiLink, Skeleton, Typography } from '@mui/material';
import { FaQuestionCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import usePending from '../../../hooks/usePending';
import { GoUnverified } from 'react-icons/go';
import { Helmet } from 'react-helmet-async';


const getCategoryColor = (category) => {
    switch (category) {
        case 'শহীদ':
            return 'error'; // Red color for 'শহীদ'
        case 'আহত':
            return 'warning'; // Orange color for 'আহত'
        case 'নিখোঁজ':
            return 'info'; // Blue color for 'নিখোঁজ'
        default:
            return 'default'; // Default color for other categories
    }
};

const ReviewPending = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { pendingCards, loading, refetch } = usePending();



    const handleReviewCard = (card) => {
        Swal.fire({
            title: 'Please check all info before confirmed',
            showDenyButton: true,
            confirmButtonText: 'Accept',
            denyButtonText: 'Decline',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/cards/${card._id}`, { status: 'verified' }).then((res) => {
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
                        axiosPublic.patch(`/cards/${card._id}`, { status }).then((res) => {
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
        { field: 'id', headerName: 'ক্রম', width: 55 },
        {
            field: 'category',
            headerName: 'ক্যাটাগরি',
            width: 85,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={getCategoryColor(params.value)}
                    variant="outlined"
                />
            ),
        },
        {
            field: 'name',
            headerName: 'নাম',
            width: 200,
            renderCell: (params) => (
                <MuiLink onClick={() => navigate(`/info/${params.row._id}`)} className="font-bold" sx={{ cursor: 'pointer' }}>
                    {params.value}           {/* replaced "`/cards/${params.row._id}`" with `/info/${params.row._id}`*/}
                </MuiLink>
            ),
        },
        { field: 'date', headerName: 'তারিখ', width: 150 },
        { field: 'place', headerName: 'ঘটনাস্থল', width: 200 },
        { field: 'occupation', headerName: 'পেশা', width: 130 },
        { field: 'institution', headerName: 'প্রতিষ্ঠান', width: 200 },
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

    const rows = pendingCards.map((card, index) => ({
        id: index + 1,
        _id: card._id,
        category: card.category,
        name: card.name,
        occupation: card.occupation,
        institution: card.institution,
        place: card.place,
        date: card.date,
    }));

    return (
        <Box padding={1} marig bgcolor="background.paper">

            <Helmet>
                <title>Review Pending Forms - GENOCIDE</title>
            </Helmet>

            <Box display="flex" justifyContent="center" mt={1} mb={2}>
                <Typography variant="h5" color="textPrimary">Total Pending Forms: <span className='italic font-bold'>{pendingCards.length}</span></Typography>
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
                        pageSize={50} // Set initial page size to 50
                        rowsPerPageOptions={[10, 25, 50]} // Provide options for 10, 25, and 50 rows per page
                        components={{
                            NoRowsOverlay: () => (
                                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                                    No data available
                                </Typography>
                            ),
                            LoadingOverlay: () => (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <Typography variant="body2" color="text.secondary">Loading...</Typography>
                                </Box>
                            ),
                        }}
                    />
                )}
            </Box>
        </Box>
    );
};

export default ReviewPending;
