import { Controller, useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { CircularProgress, Dialog, DialogContent, DialogTitle, Box, Button, LinearProgress, Snackbar, Alert, IconButton } from '@mui/material';
import { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GridCloseIcon } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dwl2slbiw/upload`;
const uploadPreset = 'remembering-july-videos';

const GalleryUpload = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [success, setSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            date: null,
        }
    });

    const handleClose = () => setOpen(false);

    const onSubmit = async (data) => {
        setLoading(true);
        setProgress(0);

        const mediaInfo = {
            date: dayjs(data.date).format('D MMMM, YYYY'),
            place: data.place,
            description: data.description,
            status: 'pending'
        };

        try {
            const mediaUrls = [];
            for (let i = 0; i < data.media.length; i++) {
                const file = data.media[i];
                const cloudinaryData = new FormData();
                cloudinaryData.append('file', file);
                cloudinaryData.append('upload_preset', uploadPreset);

                const response = await axiosPublic.post(cloudinaryUrl, cloudinaryData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setProgress(percentCompleted);
                    }
                });

                mediaUrls.push(response.data.secure_url);
            }

            const { media, ...otherData } = data;
            await axiosPublic.post('/gallery', {
                ...otherData,
                mediaUrls,
                date: dayjs(data.date).format('D MMMM, YYYY'),
                status: mediaInfo.status
            });

            setSuccess(true);
            reset();
            handleClose();
        } catch (error) {
            console.error('Error uploading media or saving data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='max-w-screen-lg mx-auto mt-4 mb-8 px-4'>
            <div className='md:flex items-center md:justify-between glass rounded-md p-4 space-y-4'>
                <div className=' text-white text-base text-center md:text-lg text-pretty'>
                    <p>"জুলাই-আগষ্ট গণহত্যা-২০২৪" সংশ্লিষ্ট গুরুত্বপূর্ণ ভিডিও বা ছবি থাকলে আপলোড করুন।</p>
                </div>
                <div className='text-center p-1'>
                    <Button variant="contained" size='large' color="primary" onClick={() => setOpen(true)}>Upload</Button>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Upload here</DialogTitle>
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    style={{ position: 'absolute', top: 10, right: 20 }}
                >
                    <GridCloseIcon />
                </IconButton>
                <DialogContent className='border-t-2'>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 0 }}>
                        <div className="rounded-[12px] bg-white shadow-sm mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">Videos & Images only</span>
                                    <span className="label label-text text-[16px] font-bold text-red-500">*</span>
                                </div>
                                <input
                                    multiple
                                    {...register("media", { required: true })}
                                    type="file"
                                    accept="image/*,video/*"
                                    className="file-input file-input-bordered w-full max-w-xs" />
                                {errors.date && <span className="text-red-500">This field is required</span>}
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-2 my-auto">
                                <div className="flex">
                                    <span className="label label-text text-[16px]">Date</span>
                                </div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Controller
                                        name="date"
                                        control={control}
                                        rules={{ required: false }}
                                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker
                                                    label="Select date"
                                                    value={value}
                                                    onChange={(newValue) => onChange(newValue)}
                                                    slotProps={{
                                                        textField: {
                                                            error: !!errors.date,
                                                            helperText: errors.date ? errors.date.message : '',
                                                            placeholder: 'DD-MM-YYYY'
                                                        }
                                                    }}
                                                />
                                            </DemoContainer>
                                        )}
                                    />
                                    {errors.date && <span className="text-red-500">This field is required</span>}
                                </LocalizationProvider>
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-2 my-auto">
                                <div className="flex">
                                    <span className="label label-text text-[16px]">Place</span>
                                </div>
                                <input
                                    {...register("place", { required: false })}

                                    type="text"
                                    placeholder="Place"
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                                {errors.name && <span className="text-red-500">This field is required</span>}
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-2 my-auto">
                                <div className="flex">
                                    <span className="label label-text text-[16px]">Description</span>
                                </div>
                                <textarea
                                    {...register("description", { required: false })}
                                    type="text"
                                    placeholder="Write about the video or image"
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs">
                                </textarea>
                                {errors.name && <span className="text-red-500">This field is required</span>}
                            </label>
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="success"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={32} /> : 'Submit'}
                        </Button>
                        {loading && <LinearProgress variant="determinate" value={progress} />}
                    </Box>
                </DialogContent>
            </Dialog>

            <Snackbar open={success} autoHideDuration={5000} onClose={() => setSuccess(false)}>
                <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    Media uploaded successfully!
                </Alert>
            </Snackbar>

        </div>
    );
};

export default GalleryUpload;
