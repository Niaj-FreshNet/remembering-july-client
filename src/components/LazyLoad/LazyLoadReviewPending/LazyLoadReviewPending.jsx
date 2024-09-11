import React, { lazy, Suspense } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';

const ReviewPending = lazy(() => import('../../../pages/Dashboard/ReviewPending/ReviewPending'));

const LazyLoadReviewPending = () => {
    return (
        <Suspense fallback={
            <Box padding={1} bgcolor="background.paper">
                <Box display="flex" justifyContent="center" mb={2}>
                    <Typography variant="h5" color="textPrimary">Loading...</Typography>
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
                    <div className='mt-8 mb-12'>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {[...Array(10)].map((_, index) => (
                                <Box key={index} sx={{ mb: 1, width: '100%' }}>
                                    <Skeleton variant="rectangular" height={70} />
                                </Box>
                            ))}
                        </Box>
                    </div>
                </Box>
            </Box>
        }>
            <ReviewPending />
        </Suspense>
    );
};

export default LazyLoadReviewPending;
