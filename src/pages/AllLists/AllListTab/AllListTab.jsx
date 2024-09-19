import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AllList from '../AllList/AllList'; // Adjust the path if necessary
import useCards from '../../../hooks/useCards';
import SearchBar from '../../../components/Search/Search';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function AllListTab() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [cards, loading] = useCards();
    const [filteredCards, setFilteredCards] = useState([]);

    const shaheed = cards.filter(card => card.category === 'শহীদ' && card.status === 'verified');
    const injured = cards.filter(card => card.category === 'আহত' && card.status === 'verified');
    const missing = cards.filter(card => card.category === 'নিখোঁজ' && card.status === 'verified');

    useEffect(() => {
        // Initialize with all cards if no filter is applied
        setFilteredCards(cards);
    }, [cards]);


    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box width='60%'>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="all list tabs example"
                        variant="scrollable"
                        scrollButtons="auto"
                        textColor="primary"
                        indicatorColor="primary"
                        sx={{
                            '.MuiTab-root': {
                                minWidth: { xs: 80, sm: 120, md: 150 },
                                fontSize: { xs: '0.75rem', sm: '1rem', md: '1rem' },
                                padding: { xs: 1, sm: 2 },
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                color: 'white', // Inactive color
                                '&.Mui-selected': {
                                    color: 'red', // Active color
                                }
                            },
                            '.MuiTabs-flexContainer': {
                                justifyContent: 'center',
                                ml: '2px'
                            },
                        }}
                    >
                        <Tab label={`শহীদ (${shaheed.length})`} {...a11yProps(0)} />
                        <Tab label={`আহত (${injured.length})`} {...a11yProps(1)} />
                        <Tab label={`নিখোঁজ (${missing.length})`} {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <Box mr={0} mb={1}>
                    {/* TODO: not implemented search functionalities yet */}
                    <SearchBar setFilteredCards={setFilteredCards} allCards={cards} loading={loading} />
                </Box>
            </Box>
            <AllList value={value} index={0} dataFiltered={shaheed}></AllList>
            <AllList value={value} index={1} dataFiltered={injured}></AllList>
            <AllList value={value} index={2} dataFiltered={missing}></AllList>
        </Box>
    );
}

export default AllListTab;
