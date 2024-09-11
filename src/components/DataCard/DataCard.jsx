import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';



import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useNavigate } from 'react-router-dom';
import { FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from 'react-share';



const 
DataCard = ({ card, index }) => {

    const { _id, category, name, occupation, institution, place, date, image } = card;
    const navigate = useNavigate();

    const [showShareOptions, setShowShareOptions] = React.useState(false);

    const handleClick = () => {
        navigate(`/info/${_id}`);      {/* replaced "cards/${_id}" with "info/${_id}"*/}
    }

    const handleShareClick = () => {
        setShowShareOptions(!showShareOptions);
    }

    const shareUrl = `${window.location.origin}/info/${_id}`;   {/* replaced "cards/${_id}" with "info/${_id}"*/}
    const title = `${name} - ${category} at ${date}`;


    return (
        <Card className='' sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={handleClick}>
                <p className="absolute left-0 ml-0 mt-0 px-3 py-1 font-bold bg-red-600 text-white">{index}</p>
                <CardMedia
                    component="img"
                    sx={{ height: 240 }}
                    image={image}
                    alt="green iguana"
                />
                <CardContent className='' sx={{ height: 210 }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                        {name}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div" sx={{ color: 'text.primary', marginTop: 1 }}>
                        {occupation}
                    </Typography>
                    <Typography variant="body3" sx={{ color: 'text.primary' }}>
                        {institution}
                    </Typography>
                    <Typography variant="body3" sx={{ color: 'text.primary' }}>
                        {place}
                    </Typography>
                    <Typography variant="body1" component="div" sx={{ color: 'text.secondary', marginY: 1 }}>
                        {date}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className='flex justify-end'>
                {showShareOptions && (
                    <div className="hidden md:flex md:space-x-2">
                        <FacebookShareButton url={shareUrl} quote={title}>
                            <FacebookIcon size={28} round />
                        </FacebookShareButton>
                        <FacebookMessengerShareButton url={shareUrl} quote={title}>
                            <FacebookMessengerIcon size={28} round />
                        </FacebookMessengerShareButton>
                        <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
                            <WhatsappIcon size={28} round />
                        </WhatsappShareButton>
                        <TwitterShareButton url={shareUrl} title={title}>
                            <XIcon size={28} round />
                        </TwitterShareButton>
                    </div>
                )}
                {showShareOptions && (
                    <div className="flex space-x-1 md:hidden">
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
                <Button onClick={handleShareClick} size="small" color="primary" sx={{ border: 1 }}>
                    Share
                </Button>
            </CardActions>
        </Card>
    );
};

export default DataCard;