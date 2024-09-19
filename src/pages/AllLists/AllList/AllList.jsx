import React from 'react';
import Box from '@mui/material/Box';
import DataCard from '../../../components/DataCard/DataCard';

function AllList(props) {
    const { children, value, index, dataFiltered, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 1 }}>
                    {dataFiltered ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-x-1 md:gap-x-4 gap-y-3 my-8">
                            {
                                dataFiltered.map((item, index) =>
                                    <DataCard
                                        key={item._id}
                                        card={item}
                                        index={index + 1}
                                    ></DataCard>
                                )
                            }
                        </div>
                    ) : (
                        children
                    )}
                </Box>
            )}
        </div>
    );
}

export default AllList;
