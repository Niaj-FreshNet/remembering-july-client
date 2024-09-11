import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

const options = ['শহীদদের তথ্য দিন', 'আহতদের তথ্য দিন', 'নিখোঁজদের তথ্য দিন'];

export default function SplitButton() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const navigate = useNavigate();

    //   const handleClick = () => {
    //     const paths = ['/shaheed', '/injured', '/missing'];
    //     navigate(paths[selectedIndex]);
    //   };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
        const paths = ['/shaheedForm', '/injuredForm', '/missingForm'];
        navigate(paths[index]);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <React.Fragment>
            <ButtonGroup
                color='error'
                variant="contained"
                ref={anchorRef}
                aria-label="Button group with a nested menu"
                sx={{
                    '& .MuiButton-root': {
                        fontSize: '0.75rem', // Smaller font size
                        padding: '2px 6px 2px 6px', // Smaller padding
                        minWidth: 'auto', // Remove min-width constraint
                        height: '32px', // Smaller height
                    }
                }}
            >
                <Button
                // onClick={handleClick}
                >
                    তথ্য দিন</Button>
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                    sx={{
                        padding: '2px', // Significantly reduced padding for the dropdown icon
                    }}
                >
                    <ArrowDropDownIcon fontSize="small" />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{ zIndex: 1 }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                placement="bottom-end" // Ensures popper opens at bottom-left
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper sx={{ width: '180px'}}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                            sx={{ fontSize: '14px' }} // Reduced font size
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}
