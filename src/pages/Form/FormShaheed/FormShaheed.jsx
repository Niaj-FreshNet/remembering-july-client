import { Controller, useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Swal from "sweetalert2";
import dayjs from 'dayjs';
import { useState } from "react";
import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import { Helmet } from "react-helmet-async";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dwl2slbiw/upload`;
const uploadPreset = 'remembering-july-videos';


const FormShaheed = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            date: null,
        }
    });
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);


    const onSubmit = async (data) => {
        setLoading(true);
        setProgress(0); // Start loading

        const shaheedAllInfo = {
            category: 'শহীদ',
            name: data.name,
            date: dayjs(data.date).format('D MMMM, YYYY'),
            place: data.place,
            details: data.details,
            culprit: data.culprit,
            occupation: data.occupation,
            institution: data.institution,
            age: data.age,
            weaponUsed: data.weaponUsed,
            deathBeforeTreatment: data.deathBeforeTreatment,
            hospital: data.hospital,
            father: data.father,
            mother: data.mother,
            address: data.address,
            permanentAddress: data.permanentAddress,
            dateOfBirth: data.dateOfBirth,
            bio: data.bio,
            familyContact: data.familyContact,
            caseDone: data.caseDone,
            caseDetails: data.caseDetails,
            sourceLink: data.sourceLink,
            fbId: data.fbId,
            relationWithInfoProvider: data.relationWithInfoProvider,
            submissionDate: dayjs().format('D MMMM, YYYY'),
            status: 'pending'
        };

        try {
            if (data.image && data.image.length > 0) {
                // If an image is selected, upload it first
                const imageFile = { image: data.image[0] };
                const res = await axiosPublic.post(image_hosting_api, imageFile, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                });
                shaheedAllInfo.image = res.data.data.display_url; // Add the uploaded image URL to the form data
            }

            // Submit the form data
            const result = await axiosPublic.post('/cards', shaheedAllInfo);

            try {
                if (data.media && data.media.length > 0) {
                    // If media is selected, upload it
                    const mediaUrls = [];
                    for (let i = 0; i < data.media.length; i++) {
                        const file = data.media[i];
                        const cloudinaryData = new FormData();
                        cloudinaryData.append('file', file);
                        cloudinaryData.append('upload_preset', uploadPreset);

                        const response = await axios.post(cloudinaryUrl, cloudinaryData, {
                            onUploadProgress: (progressEvent) => {
                                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                                setProgress(percentCompleted);
                            }
                        });

                        shaheedAllInfo.media = response.data.secure_url; // Add the uploaded media URL to the form data
                    }
                    setSuccess(true);
                }
            } catch (error) {
                console.error("Error:", error);
            }

            if (result.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'Form submitted successfully!',
                    text: 'Thank you for submitting the information.',
                    showConfirmButton: true,
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: 'Failed to submit',
                    text: 'Sorry for the inconvenience, please try again.',
                    showConfirmButton: true,
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: 'Failed to submit',
                text: 'Sorry for the inconvenience, please try again.',
                showConfirmButton: true,
            });
        } finally {
            setLoading(false); // End loading
        }


    }



    return (
        <div className="bg-[#F0EBF8]">
            <Helmet>
                <title>শহীদদের তথ্য দিন - GENOCIDE</title>
            </Helmet>
            <div className="max-w-screen-lg mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-screen-lg flex flex-col gap-3">
                    <div className=" rounded-b-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <div className="form-control w-full pl-8 pr-8 py-6 my-auto text-pretty">
                            <span className="label label-text text-2xl">বৈষম্যবিরোধী ছাত্র আন্দোলন - ২০২৪ এর শহীদ ভাই-বোনদের সঠিক তথ্য সরবরাহ করে সকল শহীদদের তালিকা প্রস্তুতিতে সহযোগিতা করুন।</span>
                            <span className="label label-text">এই অল্প সময়ে এত এত শহীদ ভাই-বোনদের তথ্য সংগ্রহ করা একার পক্ষে প্রায় অসম্ভব। আপনাদের পরিচিত কেউ শহীদ হয়ে থাকলে তথ্য পাঠিয়ে সাহায্য করুন। গুরুত্বপূর্ণ সকল তথ্য অবশ্যই সংযুক্ত করুন।</span>
                            {/* <span className="label label-text text-red-500">Logged in as: {user.email}</span> */}
                            <span className="label label-text font-bold text-red-500">* Indicates required question
                            </span>
                        </div>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">শহীদের নাম</span>
                                <span className="label label-text text-[16px] font-bold text-red-500">*</span>
                            </div>
                            <input
                                {...register("name", { required: true })}

                                type="text"
                                placeholder="Name"
                                className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                            {errors.name && <span className="text-red-500">This field is required</span>}
                        </label>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">কত তারিখে শহীদ হয়েছেন?</span>
                                <span className="label label-text text-[16px] font-bold text-red-500">*</span>
                            </div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Controller
                                    name="date"
                                    control={control}
                                    rules={{ required: true }}
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
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">কোথায় শহীদ হয়েছেন?</span>
                                <span className="label label-text text-[16px] font-bold text-red-500">*</span>
                            </div>
                            <input
                                {...register("place", { required: true })}

                                type="text"
                                placeholder="Place"
                                className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                            {errors.name && <span className="text-red-500">This field is required</span>}
                        </label>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">কিভাবে শহীদ হয়েছেন? (যদি জানা থাকে)</span>
                            </div>
                            <textarea
                                {...register("details", { required: false })}
                                type="text"
                                placeholder="ঘটনার বর্ণনা লিখুন"
                                className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs">
                            </textarea>
                        </label>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">অপরাধী/খুনি কারা?</span>
                            </div>
                            <input
                                {...register("culprit", { required: false })}

                                type="text"
                                placeholder="পুলিশ/বিজিবি/র‍্যাব/ছাত্রলীগ/অন্যান্য..."
                                className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">পেশা</span>
                                <span className="label label-text text-[16px] font-bold text-red-500">*</span>
                            </div>
                            <input
                                {...register("occupation", { required: true })}

                                type="text"
                                placeholder="ছাত্র/কর্মজীবি/শ্রমিক/শিশু/অন্যান্য..."
                                className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                            {errors.name && <span className="text-red-500">This field is required</span>}
                        </label>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">প্রতিষ্ঠান (কর্মস্থল / শিক্ষাপ্রতিষ্ঠান)</span>
                            </div>
                            <input
                                {...register("institution", { required: false })}

                                type="text"
                                placeholder="Type here"
                                className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">বয়স (আনুমানিক)</span>
                            </div>
                            <input
                                {...register("age", { required: false })}

                                type="text"
                                placeholder="Type here"
                                className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">কি ধরণের অস্ত্র ব্যবহার করে শহীদ করা হয়েছে?</span>
                            </div>
                            <input
                                {...register("weaponUsed", { required: false })}

                                type="text"
                                placeholder="বুলেট/গ্রেনেড/টিয়ারশেল/অন্যান্য..."
                                className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <div className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">চিকিৎসাধীন অবস্থায় মৃত্যবরণ করেছেন কিনা?</span>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text font-bold">হ্যাঁ</span>
                                    <input
                                        {...register("deathBeforeTreatment", { required: false })}
                                        type="radio"
                                        value="হ্যাঁ"
                                        name="deathBeforeTreatment"
                                        className="radio checked:bg-blue-500" />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text font-bold">না</span>
                                    <input
                                        {...register("deathBeforeTreatment", { required: false })}
                                        type="radio"
                                        value="না"
                                        name="deathBeforeTreatment"
                                        className="radio checked:bg-red-500" />
                                </label>
                            </div>
                            <textarea
                                {...register("hospital", { required: false })}
                                type="text"
                                placeholder="হাসপাতালের নাম লিখুন"
                                className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs mt-2">
                            </textarea>

                        </div>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">শহীদের একটি ছবি সংযুক্ত করুন (Only JPG/PNG)</span>
                            </div>
                            <input
                                {...register("image", { required: false })}
                                type="file"
                                className="file-input file-input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">সংশ্লিষ্ট আরো ছবি বা ভিডিও থাকলে আপলোড করুন (Video and Image)</span>
                            </div>
                            <input
                                multiple
                                {...register("media", { required: false })}
                                type="file"
                                accept="image/*,video/*"
                                className="file-input file-input-bordered w-full max-w-xs" />
                        </label>
                    </div>

                    {/* ------------------- Personal Information ------------------- */}

                    <div className="text-center mt-8 mb-4 px-4 font-bold ">
                        <span>উক্ত আহত ভাই/বোনের বিস্তারিত তথ্য দিয়ে সহযোগিতা করুন।</span>
                    </div>


                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">পিতার নাম</span>
                            </div>
                            <input
                                {...register("father", { required: false })}

                                type="text"
                                placeholder="Father"
                                className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">মাতার নাম</span>
                            </div>
                            <input
                                {...register("mother", { required: false })}

                                type="text"
                                placeholder="Mother"
                                className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">কোথায় থাকতেন?</span>
                            </div>
                            <input
                                {...register("address", { required: false })}

                                type="text"
                                placeholder="Address"
                                className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">স্থায়ী ঠিকানা</span>
                            </div>
                            <input
                                {...register("permanentAddress", { required: false })}

                                type="text"
                                placeholder="permanent address"
                                className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">জন্মতারিখ</span>
                            </div>
                            <input
                                {...register("dateOfBirth", { required: false })}

                                type="text"
                                placeholder="Date of birth"
                                className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">শহীদের সংক্ষিপ্ত জীবনী (যদি জানা থাকে)</span>
                            </div>
                            <textarea
                                placeholder="শহীদের সংক্ষিপ্ত জীবনী লিখুন"
                                className="textarea text-[14px] textarea-bordered textarea-md w-full max-w-xs"
                                {...register("bio", { required: false })}

                                type="text" >
                            </textarea>
                        </label>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <div className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">আপরাধীদের বিচারের দাবিতে মামলা করা হয়েছে কিনা? (যদি জানা থাকে)</span>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text font-bold">হ্যাঁ</span>
                                    <input
                                        {...register("caseDone", { required: false })}
                                        type="radio"
                                        value="হয়েছে"
                                        name="caseDone"
                                        className="radio checked:bg-blue-500" />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text font-bold">না</span>
                                    <input
                                        {...register("caseDone", { required: false })}
                                        type="radio"
                                        value="হয়নি"
                                        name="caseDone"
                                        className="radio checked:bg-red-500" />
                                </label>
                            </div>
                            <textarea
                                {...register("caseDetails", { required: false })}
                                type="text"
                                placeholder="মামলা সম্পর্কিত কিছু জানাতে চাইলে লিখুন"
                                className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs mt-2">
                            </textarea>
                        </div>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">সোর্স লিংক (ঘটনা সংশ্লিষ্ট পোস্ট, ছবি বা ভিডিও লিংক)</span>
                            </div>
                            <textarea placeholder="নিউজ লিংক, বা ফেইসবুক পোস্ট লিংক"
                                className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs"
                                {...register("sourceLink", { required: false })}

                                type="text">
                            </textarea>
                        </label>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">শহীদের পরিবারের সাথে যোগাযোগের নাম্বার</span>
                            </div>
                            <input
                                {...register("familyContact", { required: false })}

                                type="text"
                                placeholder="Phone number"
                                className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">শহীদের ফেইসবুক আইডি (যদি জানা থাকে)</span>
                            </div>
                            <input
                                {...register("fbId", { required: false })}

                                type="text"
                                placeholder="https://www.facebook.com/....."
                                className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                        <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                            <div className="flex mb-2 -mt-2">
                                <span className="label label-text text-[16px]">শহীদের সাথে আপনার সম্পর্ক (যদি থাকে)</span>
                            </div>
                            <input
                                {...register("relationWithInfoProvider", { required: false })}

                                type="text"
                                placeholder="Type here"
                                className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                        </label>
                    </div>

                    <button className="btn btn-success btn-lg text-2xl font-bold text-white my-4">SUBMIT</button>
                </form>
                {/* Loader Dialog */}
                <Dialog open={loading}>
                    <DialogContent>
                        <div className="flex justify-center items-center">
                            <CircularProgress />
                        </div>
                    </DialogContent>
                </Dialog>

            </div >
        </div >
    );
};

export default FormShaheed;