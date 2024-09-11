import React, { useState, useCallback } from 'react';
import { Box, Paper, CircularProgress, styled, alpha, InputBase } from '@mui/material';
import debounce from 'lodash/debounce';
import SearchIcon from '@mui/icons-material/Search';

const SearchWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '18ch',
            '&:focus': {
                width: '30ch',
            },
        },
        [theme.breakpoints.down('sm')]: {
            width: '8ch',
            '&:focus': {
                width: '14ch',
            },
        },
    },
}));

const SearchBar = ({ setFilteredCards, allCards, loading }) => {
    const [query, setQuery] = useState('');

    const debouncedFilter = useCallback(
        debounce((value) => {
            const filteredData = allCards
                .filter(item => item.name?.toLowerCase().includes(value.toLowerCase()))
                .sort((a, b) => {
                    const aIndex = a.name.toLowerCase().indexOf(value.toLowerCase());
                    const bIndex = b.name.toLowerCase().indexOf(value.toLowerCase());
                    return aIndex - bIndex;
                });
            setFilteredCards(filteredData);
        }, 300), [allCards, setFilteredCards]
    );

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedFilter(value);
    };

    return (
        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
            {
                loading && (
                    <Box mt={1}>
                        <CircularProgress size={30} />
                    </Box>
                )
            }
            <Box>
                <Paper elevation={1}>
                    <SearchWrapper>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={query}
                            onChange={handleInputChange}
                        />
                    </SearchWrapper>
                </Paper>
            </Box>
        </Box>
    );
};

export default SearchBar;
