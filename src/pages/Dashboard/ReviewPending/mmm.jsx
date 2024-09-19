import React, { useEffect, useState } from 'react';
import { DataGrid, GridCloseIcon } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Box, Button, Chip, Dialog, DialogContent, DialogTitle, IconButton, Link as MuiLink, Skeleton, Typography } from '@mui/material';
import { FaQuestionCircle } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import usePending from '../../../hooks/usePending';
import { GoUnverified } from 'react-icons/go';
import { Helmet } from 'react-helmet-async';
import '../../DetailedPage/DetailedPageDialogBox.css'
import Spinner from '../../DetailedPage/Spinner';
import MediaModal from '../../DetailedPage/MediaModal';


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

    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [selectedGallery, setSelectedGallery] = useState(null);



    useEffect(() => {
        if (!loading) {
            const foundDetails = cards.find((card) => card._id === id);
            setDetails(foundDetails || {});
            console.log(foundDetails)
        }
    }, [cards, loading, id]);

    if (loading) {
        return <Spinner />; // Show Spinner when loading   {/* :::::::CHATGPT:::::: Kindly set a loader on the full viewport (i've a component spinner) */}
    }

    if (!details) {
        return <div>No details found</div>;
    }


// Function to determine if the URL is an image
const isImage = (url) => /\.(jpeg|jpg|gif|png|webp)$/i.test(url);

// Function to determine if the URL is a video
const isVideo = (url) => /\.(mp4|webm|ogg|mov)$/i.test(url);

// Flatten the media array using reduce
// Ensure details.media is an array before using reduce
const flatMedia = details.media && Array.isArray(details.media)
  ? details.media.reduce((acc, item) => {
      if (Array.isArray(item)) {
        return acc.concat(item);
      }
      return acc.concat([item]);
    }, [])
  : [];

// Log the contents of details.media and flatMedia for debugging
console.log('details.media:', details.media);
console.log('flatMedia:', flatMedia);


    const handleButtonClick = (card) => {
        handleReviewCard(card);
        setSelectedMedia(null);
    };

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
        { field: 'id', headerName: 'ক্রম', width: 55,
            renderCell: (params) => (
                <MuiLink onClick={() => navigate(`/info/${params.row._id}`)} className="font-bold" sx={{ cursor: 'pointer' }}>
                    {params.value}          
                </MuiLink>
            ),
        },
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
                <div>
                    {params.row._id ? (
                        <div
                            key={params.row._id}
                            className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                            onClick={() => setSelectedMedia(params.row)}
                        >
                            {params.row.name}
                        </div>
                    ) : (
                        <Typography variant="body2">No media</Typography>
                    )}
            
                    {/* Popup for Full-Size Media */}
                    <Dialog open={Boolean(selectedMedia)} onClose={() => setSelectedMedia(null)} fullWidth maxWidth="md">
                        <DialogTitle className="border-b-2 border-gray-100 flex justify-between items-center">
                            <div className="badge rounded-lg bg-red-700 text-white px-2 py-4 mt-2 font-extrabold">
                                <p>{params.row.category}</p>
                            </div>
                                <div className="md:hidden">
                                    <p className="text-sm italic">Last updated: {params.row.submissionDate}</p>
                                </div>
                            <IconButton
                                color="inherit"
                                onClick={() => setSelectedMedia(null)}
                                aria-label="close"
                            >
                                <GridCloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <div className="max-w-screen-lg mx-auto my-2 py-2 text-pretty">
                                {/* Mobile Header */}
                                <div className="flex justify-center mb-4 md:hidden">
                                    <div className="text-3xl font-semibold">
                                        <span>{params.row.name}</span>
                                    </div>
                                </div>
            
                                {/* Main Content */}
                                <div className="md:flex md:justify-center md:px-3 md:space-x-8">
                                    {/* Left Column (Image and Details) */}
                                    <div className="w-full md:w-1/2 space-y-4">
                                        <div className="flex flex-col gap-0">
                                            <div className="hidden md:flex md:justify-between md:items-end">
                                                <p className="text-sm italic">Last updated: {params.row.submissionDate}</p>
                                            </div>
                                            <div className="flex justify-center py-4">
                                                <img
                                                    className="w-full h-auto object-cover rounded-lg"
                                                    src={params.row.image}
                                                    alt={params.row.name}
                                                />
                                            </div>
                                        </div>
                                        <div className="bg-gray-100 rounded-lg p-4">
                                            <div className="death-info">শাহাদাতবরণ করেনঃ <span className="death-info-value">{params.row.date}</span></div>
                                            <div className="death-info">যেখানে শহীদ হনঃ <span className="death-info-value">{params.row.place}</span></div>
                                            <br />
                                            <div className="bg-gray-200 rounded-lg p-2 space-y-2">
                                                <div className="death-info-details">যেভাবে শহীদ হয়েছেনঃ</div>
                                                <div className="death-info-details-value">{params.row.details}</div>
                                            </div>
                                            <br />
                                            <div className="death-info">যে অস্ত্রের আঘাতে শহীদ হনঃ <span className="death-info-value">{params.row.weaponUsed}</span></div>
                                            <div className="death-info">অপরাধী/খুনী যারাঃ <span className="death-info-value">{params.row.culprit}</span></div>
                                            <div className="death-info">অপরাধীদের বিচারঃ <span className="death-info-value">{params.row.caseDetails}</span></div>
                                        </div>
                                    </div>
            
                                    {/* Right Column (Name and Biography) */}
                                    <div className="w-full md:w-1/2 space-y-8">
                                        {/* Desktop Header */}
                                        <div className="hidden md:flex items-start mb-6">
                                            <div className="text-3xl font-semibold">
                                                <span>{params.row.name}</span>
                                            </div>
                                        </div>
            
                                        <div className="bg-gray-100 rounded-lg p-4">
                                            <div className="details-info">পিতার নামঃ <span className="details-info-value">{params.row.father}</span></div>
                                            <div className="details-info">মাতার নামঃ <span className="details-info-value">{params.row.mother}</span></div>
                                            <div className="details-info">জন্মতারিখঃ <span className="details-info-value">{params.row.dateOfBirth}</span></div>
                                            <div className="details-info">স্থায়ী ঠিকানাঃ <span className="details-info-value">{params.row.permanentAddress}</span></div>
                                            <br />
                                            <div className="details-info">বয়সঃ <span className="details-info-value">{params.row.age}</span></div>
                                            <div className="details-info">পেশাঃ <span className="details-info-value">{params.row.occupation}</span></div>
                                            <div className="details-info">প্রতিষ্ঠানঃ <span className="details-info-value">{params.row.institution}</span></div>
                                            <div className="details-info">যেখানে থাকতেনঃ <span className="details-info-value">{params.row.address}</span></div>
                                        </div>
                                        <div className="bg-gray-200 max-w-screen-sm rounded-lg p-4">
                                            <div className="space-y-2">
                                                <div className="bio">সংক্ষিপ্ত জীবনীঃ</div>
                                                <div className="bio-value">{params.row.bio}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            
                                {/* Gallery Section */}
    <div className="max-w-screen-lg mx-auto px-2 py-8">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 underline">Inside Gallery</h2>
      {flatMedia.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {flatMedia.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              onClick={() => setSelectedGallery(item)}
            >
              {isVideo(item) ? (
                <video
                  controls
                  src={item}
                  className="w-full h-auto object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              ) : isImage(item) ? (
                <img
                  src={item}
                  alt={`Media ${index}`}
                  className="w-full h-auto object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg p-4">
                  Unsupported media type
                </div>
              )}
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Preview</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No media available.</p>
      )}

      {/* Modal Component */}
      <MediaModal
        open={Boolean(selectedGallery)}
        onClose={() => setSelectedGallery(null)}
        media={selectedGallery}
      />
    </div>


            
                            </div>
                        </DialogContent>
                        <DialogTitle className="border-t-2 border-gray-100 flex justify-between items-center">
                                    <Link to={`/dashboard/editInfo/${params.row._id}`}>
                                        <button className="btn btn-error btn-sm px-4 py-2 text-white rounded">
                                            Edit Info
                                        </button>
                                    </Link>
                                    <Button onClick={() => handleButtonClick(params.row)} className="btn btn-ghost btn-sm bg-slate-400">
                                           <GoUnverified className="text-3xl text-red-600 -mt-1" />
                                    </Button>
                        </DialogTitle>
                    </Dialog>
                </div>
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
        image: card.image,
        date: card.date,
        place: card.place,
        details: card.details,
        weaponUsed: card.weaponUsed,
        culprit: card.culprit,
        caseDetails: card.caseDetails,
        father: card.father,
        mother: card.mother,
        dateOfBirth: card.dateOfBirth,
        permanentAddress: card.permanentAddress,
        age: card.age,
        occupation: card.occupation,
        institution: card.institution,
        address: card.address,
        bio: card.bio,
        sourceLink: card.sourceLink,

        deathBeforeTreatment: card.deathBeforeTreatment,
        hospital: card.hospital,
        nowHealth: card.nowHealth,  /* new sec*/
        govtHelp: card.govtHelp,    /* new sec*/
        media: card.media,     /* new sec*/
        familyContact: card.familyContact,
        caseDone: card.caseDone,
        fbId: card.fbId,
        relationWithInfoProvider: card.relationWithInfoProvider,
        submissionDate: card.submissionDate

    }));

    return (
        <Box padding={1} bgcolor="background.paper">

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
