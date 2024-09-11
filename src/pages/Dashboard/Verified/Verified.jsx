// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useCards from "../../../hooks/useCards";

// const Verified = () => {
//     const axiosPublic = useAxiosPublic();

//     // const { data: cards = [], isLoading: loading, refetch } = useQuery({
//     //     queryKey: ['cards'],
//     //     queryFn: async () => {
//     //         const res = await axiosPublic.get('/cards');
//     //         return res.data.filter(card => ['verified'].includes(card.status));
//     //     }
//     // });
//     const [cards, loading, refetch] = useCards();

//     const verified = cards.filter(card => ['verified'].includes(card.status))



//     return (
//         <div>
//             <div>
//                 <div className="flex justify-evenly top-0 mb-4">
//                     <h2 className="text-3xl">Total Verified Forms: {verified.length}</h2>
//                 </div>
//                 <div className="overflow-x-auto mb-6">
//                     <table className="table">
//                         {/* head */}
//                         <thead className="bg-amber-300">
//                             <tr>
//                                 <th>ক্রম</th>
//                                 <th>নাম</th>
//                                 <th>পেশা</th>
//                                 <th>ঘটনাস্থল</th>
//                                 <th>তারিখ</th>
//                                 <th>Status</th>
//                             </tr>
//                         </thead>
//                         {/* row */}
//                         <tbody>
//                             {
//                                 cards.map((card, index) => <tr key={card._id}>
//                                     <td>{index + 1}</td>
//                                     <td className="font-bold">{card.name}</td>
//                                     <td>{card.occupation}</td>
//                                     <td>{card.place}</td>
//                                     <td>{card.date}</td>
//                                     <td>{card.status}</td>
//                                 </tr>)
//                             }
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Verified;


import React from 'react';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Box, Typography, Skeleton, Link as MuiLink, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { MdVerified } from 'react-icons/md';
import useCards from '../../../hooks/useCards';
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

const Verified = () => {
    const axiosPublic = useAxiosPublic();

    const [cards, loading, refetch] = useCards();

    const verifiedCards = cards.filter(card => ['verified'].includes(card.status));


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
                <MuiLink onClick={() => navigate(`/cards/${params.row._id}`)} className="font-bold" sx={{ cursor: 'pointer' }}>
                    {params.value}
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
            renderCell: () => (
                    <MdVerified className="text-3xl text-sky-600 mt-2 ml-4" />
            ),
        },
    ];

    const rows = verifiedCards.map((card, index) => ({
        id: index + 1,
        _id: card._id,
        category: card.category,
        name: card.name,
        occupation: card.occupation,
        institution: card.institution,
        place: card.place,
        date: card.date,
        status: card.status
    }));



    return (
        <Box padding={1} bgcolor="background.paper">

            <Helmet>
                <title>Verified Forms - GENOCIDE</title>
            </Helmet>

            <Box display="flex" justifyContent="center" mt={1} mb={2}>
                <Typography variant="h5" color="textPrimary">Total Verified Forms: <span className='font-bold italic'>{verifiedCards.length}</span></Typography>
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

export default Verified;






