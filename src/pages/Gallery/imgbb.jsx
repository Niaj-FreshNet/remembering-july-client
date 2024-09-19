import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import axios from 'axios';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Gallery = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            date: null,
        }
    });

    const onSubmit = async (data) => {
        setLoading(true);

        const imageInfo = {
            date: data.date,
            description: data.description,
            status: 'pending'
        };

        try {
            const imageUrls = [];
            for (let i = 0; i < data.images.length; i++) {
                const formData = new FormData();
                formData.append('image', data.images[i]);
                const imgbbResponse = await axios.post(image_hosting_api, formData);
                console.log(imgbbResponse.data);

                imageUrls.push(imgbbResponse.data.data.url);
            }

            const { images, ...otherData } = data;

            const result = await axiosPublic.post('/gallery', {
                ...otherData,
                imageUrls
            });
            console.log(result.data);

            // reset();
        } catch (error) {
            console.error('Error uploading images or saving data:', error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get('/gallery');
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    
      if (!Array.isArray(data)) {
        return <p>No images to display.</p>;
      }

    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
        },
        {
            img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
            title: 'Hats',
        },
        {
            img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
            title: 'Honey',
        },
        {
            img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
            title: 'Basketball',
        },
        {
            img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
            title: 'Fern',
        },
        {
            img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
            title: 'Mushrooms',
        },
        {
            img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
            title: 'Tomato basil',
        },
        {
            img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
            title: 'Sea star',
        },
        {
            img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
            title: 'Bike',
        },
    ];




    return (
        <div className='max-w-screen-lg mx-auto'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                    <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                        <div className="flex mb-2 -mt-2">
                            <span className="label label-text text-[16px]">শহীদের একাধিক ছবি সংযুক্ত করুন (Only PNG/JPG)</span>
                        </div>
                        <input
                            multiple
                            {...register("images", { required: true })}
                            type="file"
                            className="file-input file-input-bordered w-full max-w-xs" />
                    </label>
                </div>
                <button className="btn btn-success btn-sm font-bold text-white my-4">SUBMIT</button>
            </form>
            {/* Loader Dialog */}
            <Dialog open={loading}>
                <DialogContent>
                    <div className="flex justify-center items-center">
                        <CircularProgress />
                    </div>
                </DialogContent>
            </Dialog>
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                {data.map((item) => (
                    item.imageUrls?.map((url, index) => (
                        <ImageListItem key={index}>
                            <img
                                srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${url}?w=164&h=164&fit=crop&auto=format`}
                                alt={`Image ${index + 1}`}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))
                ))}
            </ImageList>
        </div>
    );
};

export default Gallery;
