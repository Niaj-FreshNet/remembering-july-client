import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from 'react-share';
import { useNavigate } from 'react-router-dom';
import { SlCalender } from 'react-icons/sl';
import { CiShare1, CiShare2 } from 'react-icons/ci';

const DataCard = ({ card, index }) => {
    const { _id, category, name, occupation, institution, permanentAddress, address, date, image } = card;
    const navigate = useNavigate();
    console.log(address)

    const [showShareOptions, setShowShareOptions] = React.useState(false);

    const handleClick = () => {
        navigate(`/info/${_id}`);
    };

    const handleShareClick = () => {
        setShowShareOptions(!showShareOptions);
    };

    const shareUrl = `${window.location.origin}/info/${_id}`;
    const title = `${name} - ${category} at ${date}`;

    return (
        <Card sx={{ maxWidth: 345, position: 'relative' }}>
            <CardActionArea onClick={handleClick} sx={{ position: 'relative' }}>
                {/* Index Badge */}
                <p className="absolute top-2 left-2 px-2 py-1 font-bold bg-red-600 text-white rounded" style={{ zIndex: 10 }}>{index}</p>

                {/* Media with Hover Effect */}
                <CardMedia
                    component="img"
                    sx={{ height: 240, transition: 'transform 0.3s ease' }}
                    image={image}
                    alt={name}
                    className='hover:scale-105'
                />

                {/* Upper Content with Hover Effect */}
                <CardContent sx={{ height: 210, transition: 'transform 0.3s ease' }} className='hover:translate-y-[-0.5rem]'>
                    {/* <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                        {name}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div" sx={{ color: 'text.primary', marginTop: 1 }}>
                        {occupation}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary' }}>
                        {institution}
                    </Typography>
                    <Typography variant="body1" component="div" sx={{ color: 'text.secondary', marginY: 1 }}>
                        {date}
                    </Typography> */}

                    <div className='flex flex-col justify-between h-full overflow-clip'>
                        <div className='flex flex-col justify-around h-full overflow-hidden'>
                            <div className='text-xl text-black'>
                                {name}
                            </div>
                            <div className='px-1'>
                                <div className='text-sm mb-1 text-gray-700'>
                                    {occupation}
                                </div>
                                <div className='text-sm'>
                                {institution && institution.trim() !== "" ? institution : permanentAddress}
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center gap-2 text-base text-gray-600 mt-auto px-1'>
                            <SlCalender /> {date}
                        </div>
                    </div>
                </CardContent>
            </CardActionArea>

            {/* Actions */}
            <CardActions className='flex justify-end items-center h-10 p-0 border-t-2 border-gray-100'>
                {showShareOptions && (
                    <div className="hidden md:flex md:space-x-1">
                        <FacebookShareButton url={shareUrl} quote={title}>
                            <FacebookIcon size={24} round />
                        </FacebookShareButton>
                        <FacebookMessengerShareButton url={shareUrl} quote={title}>
                            <FacebookMessengerIcon size={24} round />
                        </FacebookMessengerShareButton>
                        <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
                            <WhatsappIcon size={24} round />
                        </WhatsappShareButton>
                        <TwitterShareButton url={shareUrl} title={title}>
                            <XIcon size={24} round />
                        </TwitterShareButton>
                    </div>
                )}
                {showShareOptions && (
                    <div className="flex space-x-1 md:hidden">
                        <FacebookShareButton url={shareUrl} quote={title}>
                            <FacebookIcon size={20} round />
                        </FacebookShareButton>
                        <FacebookMessengerShareButton url={shareUrl} quote={title}>
                            <FacebookMessengerIcon size={20} round />
                        </FacebookMessengerShareButton>
                        <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
                            <WhatsappIcon size={20} round />
                        </WhatsappShareButton>
                        <TwitterShareButton url={shareUrl} title={title}>
                            <XIcon size={20} round />
                        </TwitterShareButton>
                    </div>
                )}
                <Button onClick={handleShareClick} >
                    <CiShare2 className='text-2xl' />
                </Button>
            </CardActions>
        </Card>
    );
};

export default DataCard;
