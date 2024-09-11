import { Controller, useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useState } from "react";
import { CircularProgress, Dialog, DialogContent } from "@mui/material";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`



const EditInfo = () => {
    const { _id, category, name, date, place, details, underTreatment, nowHealth, govtHelp, culprit, occupation, institution, age, weaponUsed, deathBeforeTreatment, hospital, image, father, mother, address, permanentAddress, dateOfBirth, bio, familyContact, caseDone, caseDetails, sourceLink, fbId, relationWithInfoProvider } = useLoaderData();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            date: dayjs(date), // Assuming `date` is in a compatible format
        }
    });
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        Swal.fire({
            title: 'Please check all info before confirmed',
            showCancelButton: true,
            confirmButtonText: 'UPDATE and VERIFY',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true); // Start loading

                let imageUrl = image; // Default to existing image URL if no new image is uploaded
                if (data.image && data.image.length > 0) {
                    try {
                        // Upload new image
                        const imageFile = { image: data.image[0] };
                        const res = await axiosPublic.post(image_hosting_api, imageFile, {
                            headers: {
                                'content-type': 'multipart/form-data'
                            }
                        });
                        imageUrl = res.data.data.display_url; // Update image URL
                        console.log("Image Upload Response:", res.data);
                    } catch (uploadError) {
                        console.error("Error uploading image:", uploadError);
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: 'Image upload failed!',
                            text: 'There was an error uploading the image.',
                            showConfirmButton: true,
                            timer: 3000
                        });
                        setLoading(false);
                        return; // Exit the function if image upload fails
                    }
                }

                // Prepare form data for submission
                const allInfo = {
                    name: data.name,
                    date: dayjs(data.date).format('D MMMM, YYYY'),
                    place: data.place,
                    details: data.details,
                    underTreatment: data.underTreatment,
                    nowHealth: data.nowHealth,  /* new section */
                    govtHelp: data.govtHelp,    /* new section */
                    culprit: data.culprit,
                    occupation: data.occupation,
                    institution: data.institution,
                    age: data.age,
                    weaponUsed: data.weaponUsed,
                    deathBeforeTreatment: data.deathBeforeTreatment,
                    hospital: data.hospital,
                    image: imageUrl,  // Use the uploaded image URL or existing image URL
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
                    status: 'verified' // Add status field
                };

                try {
                    // Submit the form data
                    const result = await axiosPublic.patch(`/cards/${_id}`, allInfo);
                    console.log("Update Response:", result.data);

                    if (result.data.modifiedCount > 0) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: 'Form updated successfully!',
                            text: 'Thank you for updating the information.',
                            showConfirmButton: true,
                            // timer: 3000
                        });
                        navigate(`/dashboard/reviewPending`);
                    } else {
                        Swal.fire({
                            position: "top-end",
                            icon: "info",
                            title: 'No changes detected!',
                            text: 'The information provided is already up-to-date.',
                            showConfirmButton: true,
                            // timer: 3000
                        });
                    }
                } catch (updateError) {
                    console.error("Error updating form data:", updateError);
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: 'Update failed!',
                        text: 'There was an error updating the form data. Try again',
                        showConfirmButton: true,
                        // timer: 3000
                    });
                } finally {
                    setLoading(false); // End loading
                }
            }
        })
    }


    return (

        <div className="bg-[#F0EBF8]">
            <div className="max-w-screen-lg mx-auto">
                <div className=" rounded-b-[12px] bg-white shadow-sm w-4/5 mx-auto mb-6">
                    <div className="form-control w-full pl-8 pr-8 py-6 my-auto text-pretty">
                        <span className="label label-text text-2xl">সকল তথ্য ভালোভাবে যাচাই-বাছাই ও নিরিক্ষণ করে ইউজার কর্তৃক পূরণকৃত ফর্মটি আপডেট করুন। গুরুত্বপূর্ণ সকল তথ্য অবশ্যই সংযুক্ত করুন।</span>
                        <span className="label label-text">পরবর্তী প্রজন্মের কাছে জুলাই গণহত্যার প্রকৃত ইতিহাস ও শহীদ, আহত ও নিখোঁজদের আত্মত্যাগের গল্পগুলো পৌঁছে দিতে আমরা দায়বদ্ধ। </span>
                        <span className="label label-text text-red-500">Logged in as: {user.email}</span>
                        <span className="label label-text font-bold text-red-500">* Indicates required question
                        </span>
                    </div>
                </div>


                {/* -------------------Shaheed Form Update------------------ */}

                {category === "শহীদ" && (
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-screen-lg flex flex-col gap-3">
                        <div className="rounded-[12px] flex bg-white w-4/5 shadow-sm mx-auto">
                            <div className="flex flex-col mx-auto md:mx-0">
                                <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                    <div className="flex -mt-2">
                                        <span className="label text-[16px]">ক্যাটাগরী</span>
                                        <span className="label text-[14px] font-bold text-red-500">* (Don't change this eventually)</span>
                                    </div>
                                    {errors.name && <span className="text-red-500">This field is required</span>}
                                </label>
                                <div className="flex justify-evenly gap-4 mb-4 -mt-2 mx-auto md:ml-4 w-full">
                                    <div className="form-control">
                                        <label className="label cursor-pointer gap-2">
                                            <span className="label-text font-bold">শহীদ</span>
                                            <input
                                                {...register("category", { required: true })}
                                                defaultChecked={category === "শহীদ"} //TODO
                                                type="radio"
                                                value="শহীদ"
                                                name="category"
                                                className="radio checked:bg-red-500" />
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label cursor-pointer gap-2">
                                            <span className="label-text font-base">আহত</span>
                                            <input
                                                {...register("category", { required: true })}
                                                defaultChecked={category === "আহত"} //TODO
                                                type="radio"
                                                value="আহত"
                                                name="category"
                                                className="radio checked:bg-green-500" />
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label cursor-pointer gap-2">
                                            <span className="label-text font-base">নিখোঁজ</span>
                                            <input
                                                {...register("category", { required: true })}
                                                defaultChecked={category === "নিখোঁজ"} //TODO
                                                type="radio"
                                                value="নিখোঁজ"
                                                name="category"
                                                className="radio checked:bg-blacl" />
                                        </label>
                                    </div>
                                </div>
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

                                    defaultValue={name}
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
                                        defaultValue={date} //TODO
                                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker
                                                    label="Select date"
                                                    value={value}
                                                    onChange={(newValue) => onChange(newValue)}
                                                    slotProps={{
                                                        textField: {
                                                            // {...params}
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

                                    defaultValue={place}
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
                                    defaultValue={details}
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

                                    defaultValue={culprit}
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

                                    defaultValue={occupation}
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

                                    defaultValue={institution}
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

                                    defaultValue={age}
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

                                    defaultValue={weaponUsed}
                                    type="text"
                                    placeholder="বুলেট/গ্রেনেড/টিয়ারশেল/অন্যান্য..."
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <div className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">চিকিৎসাধীন অবস্থায় মৃত্যুবরণ করেছেন কিনা?</span>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text font-bold">হ্যাঁ</span>
                                        <input
                                            {...register("deathBeforeTreatment", { required: false })}
                                            defaultChecked={deathBeforeTreatment === "হ্যাঁ"} //TODO
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
                                            defaultChecked={deathBeforeTreatment === "না"} //TODO
                                            type="radio"
                                            value="না"
                                            name="deathBeforeTreatment"
                                            className="radio checked:bg-red-500" />
                                    </label>
                                </div>
                                <textarea
                                    {...register("hospital", { required: false })}
                                    defaultValue={hospital}
                                    type="text"
                                    placeholder="হাসপাতালের নাম লিখুন"
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs mt-2">
                                </textarea>

                            </div>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <div className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">শহীদের একটি ছবি সংযুক্ত করুন (Only PNG/JPG)</span>
                                </div>
                                {/* Display existing image */}
                                <div className=" md:flex justify-between items-start">

                                    <div className="mb-4">
                                        <label className="label font-bold">Upload New Image</label>
                                        <input
                                            {...register("image")}
                                            type="file"
                                            className="file-input file-input-bordered w-full max-w-xs"
                                        />
                                    </div>
                                    {image && (
                                        <div className="mb-4">
                                            <label className="label font-bold">Existing Image</label>
                                            <img src={image} alt="Existing" className="w-[240px] h-[240px] rounded-lg max-w-xs" />
                                        </div>
                                    )}
                                </div>
                                {errors.image && <span className="text-red-500">This field is required</span>}
                            </div>
                        </div>

                        {/* ------------------- Personal Information ------------------- */}

                        <div className="text-center mt-8 mb-4 px-4 font-bold ">
                            <span>উক্ত শহীদ ভাই/বোনের বিস্তারিত তথ্য দিয়ে সহযোগিতা করুন</span>
                        </div>


                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">পিতার নাম</span>
                                </div>
                                <input
                                    {...register("father", { required: false })}

                                    defaultValue={father}
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

                                    defaultValue={mother}
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

                                    defaultValue={address}
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

                                    defaultValue={permanentAddress}
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

                                    defaultValue={dateOfBirth}
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

                                    defaultValue={bio}
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
                                            defaultChecked={caseDone === "হয়েছে"} //TODO
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
                                            defaultChecked={caseDone === "হয়নি"} //TODO
                                            type="radio"
                                            value="হয়নি"
                                            name="caseDone"
                                            className="radio checked:bg-red-500" />
                                    </label>
                                </div>
                                <textarea
                                    {...register("caseDetails", { required: false })}
                                    defaultValue={caseDetails}
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

                                    defaultValue={sourceLink}
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

                                    defaultValue={familyContact}
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

                                    defaultValue={fbId}
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

                                    defaultValue={relationWithInfoProvider}
                                    type="text"
                                    placeholder="Type here"
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                            </label>
                        </div>

                        <button className="btn btn-error btn-lg text-2xl font-bold text-white my-4">UPDATE</button>
                    </form>
                )}


                {/* -------------------Injured form update-------------------*/}


                {category === "আহত" && (
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-screen-lg flex flex-col gap-3">
                        <div className="rounded-[12px] flex bg-white w-4/5 shadow-sm mx-auto">
                            <div className="flex flex-col mx-auto md:mx-0">
                                <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                    <div className="flex -mt-2">
                                        <span className="label text-[16px]">ক্যাটাগরী</span>
                                        <span className="label text-[14px] font-bold text-red-500">* (Don't change this eventually)</span>
                                    </div>
                                    {errors.name && <span className="text-red-500">This field is required</span>}
                                </label>
                                <div className="flex justify-evenly gap-4 mb-4 -mt-2 mx-auto md:ml-4 w-full">
                                    <div className="form-control">
                                        <label className="label cursor-pointer gap-2">
                                            <span className="label-text">শহীদ</span>
                                            <input
                                                {...register("category", { required: true })}
                                                defaultChecked={category === "শহীদ"} //TODO
                                                type="radio"
                                                value="শহীদ"
                                                name="category"
                                                className="radio checked:bg-red-500" />
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label cursor-pointer gap-2">
                                            <span className="label-text font-bold">আহত</span>
                                            <input
                                                {...register("category", { required: true })}
                                                defaultChecked={category === "আহত"} //TODO
                                                type="radio"
                                                value="আহত"
                                                name="category"
                                                className="radio checked:bg-green-500" />
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label cursor-pointer gap-2">
                                            <span className="label-text font-base">নিখোঁজ</span>
                                            <input
                                                {...register("category", { required: true })}
                                                defaultChecked={category === "নিখোঁজ"} //TODO
                                                type="radio"
                                                value="নিখোঁজ"
                                                name="category"
                                                className="radio checked:bg-blacl" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">আহতের নাম</span>
                                    <span className="label label-text text-[16px] font-bold text-red-500">*</span>
                                </div>
                                <input
                                    {...register("name", { required: true })}

                                    defaultValue={name}
                                    type="text"
                                    placeholder="Name"
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                                {errors.name && <span className="text-red-500">This field is required</span>}
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">কত তারিখে আহত হয়েছেন?</span>
                                    <span className="label label-text text-[16px] font-bold text-red-500">*</span>
                                </div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Controller
                                        name="date"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={date} //TODO
                                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker
                                                    label="Select date"
                                                    value={value}
                                                    onChange={(newValue) => onChange(newValue)}
                                                    slotProps={{
                                                        textField: {
                                                            // {...params}
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
                                    <span className="label label-text text-[16px]">কোথায় আহত হয়েছেন?</span>
                                    <span className="label label-text text-[16px] font-bold text-red-500">*</span>
                                </div>
                                <input
                                    {...register("place", { required: true })}
                                    defaultValue={place}
                                    type="text"
                                    placeholder="Place"
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                                {errors.name && <span className="text-red-500">This field is required</span>}
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">কিভাবে আহত হয়েছেন? (যদি জানা থাকে)</span>
                                </div>
                                <textarea
                                    {...register("details", { required: false })}
                                    defaultValue={details}
                                    type="text"
                                    placeholder="ঘটনার বর্ণনা লিখুন"
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs">
                                </textarea>
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <div className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">বর্তমানে চিকিৎসাধীন অবস্থায় রয়েছেন কিনা?</span>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text font-bold">হ্যাঁ</span>
                                        <input
                                            {...register("underTreatment", { required: false })}
                                            defaultValue={underTreatment === "হ্যাঁ"}
                                            type="radio"
                                            value="হ্যাঁ"
                                            name="underTreatment"
                                            className="radio checked:bg-blue-500" />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text font-bold">না</span>
                                        <input
                                            {...register("underTreatment", { required: false })}
                                            defaultValue={underTreatment === "না"}
                                            type="radio"
                                            value="না"
                                            name="underTreatment"
                                            className="radio checked:bg-red-500" />
                                    </label>
                                </div>
                                <textarea
                                    {...register("nowHealth", { required: false })}
                                    defaultValue={nowHealth}
                                    type="text"
                                    placeholder="বর্তমানে শারীরিক অবস্থা সম্পর্কে লিখুন..."
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs mt-2">
                                </textarea>
                            </div>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <div className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">সরকারীভাবে চিকিৎসা সেবা বা আর্থিক সহযোগিতা পেয়েছেন কিনা?</span>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text font-bold">হ্যাঁ</span>
                                        <input
                                            {...register("govtHelp", { required: false })}
                                            defaultValue={govtHelp === "পেয়েছেন"}
                                            type="radio"
                                            value="পেয়েছেন"
                                            name="govtHelp"
                                            className="radio checked:bg-blue-500" />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text font-bold">না</span>
                                        <input
                                            {...register("govtHelp", { required: false })}
                                            defaultValue={govtHelp === "পাননি"}
                                            type="radio"
                                            value="পাননি"
                                            name="govtHelp"
                                            className="radio checked:bg-red-500" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">পেশা</span>
                                    <span className="label label-text text-[16px] font-bold text-red-500">*</span>
                                </div>
                                <input
                                    {...register("occupation", { required: true })}

                                    defaultValue={occupation}
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
                                    defaultValue={institution}
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
                                    defaultValue={age}
                                    type="text"
                                    placeholder="Type here"
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">অপরাধী কারা?</span>
                                </div>
                                <input
                                    {...register("culprit", { required: false })}
                                    defaultValue={culprit}
                                    type="text"
                                    placeholder="পুলিশ/বিজিবি/র‍্যাব/ছাত্রলীগ/অন্যান্য..."
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">কি ধরণের অস্ত্র ব্যবহার করে আহত করা হয়েছে?</span>
                                </div>
                                <input
                                    {...register("weaponUsed", { required: false })}
                                    defaultValue={weaponUsed}
                                    type="text"
                                    placeholder="বুলেট/গ্রেনেড/টিয়ারশেল/অন্যান্য..."
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <div className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">আহতের একটি ছবি সংযুক্ত করুন (Only PNG/JPG)</span>
                                </div>
                                {/* Display existing image */}
                                <div className=" md:flex justify-between items-start">

                                    <div className="mb-4">
                                        <label className="label font-bold">Upload New Image</label>
                                        <input
                                            {...register("image")}
                                            type="file"
                                            className="file-input file-input-bordered w-full max-w-xs"
                                        />
                                    </div>
                                    {image && (
                                        <div className="mb-4">
                                            <label className="label font-bold">Existing Image</label>
                                            <img src={image} alt="Existing" className="w-[240px] h-[240px] rounded-lg max-w-xs" />
                                        </div>
                                    )}
                                </div>
                                {errors.image && <span className="text-red-500">This field is required</span>}
                            </div>
                        </div>

                        {/* ------------------- Personal Information ------------------- */}

                        <div className="text-center mt-8 mb-4 px-4 font-bold   ">
                            <span>উক্ত আহত ভাই/বোনের বিস্তারিত তথ্য দিয়ে সহযোগিতা করুন</span>
                        </div>


                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">পিতার নাম</span>
                                </div>
                                <input
                                    {...register("father", { required: false })}

                                    defaultValue={father}
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

                                    defaultValue={mother}
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

                                    defaultValue={address}
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

                                    defaultValue={permanentAddress}
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

                                    defaultValue={dateOfBirth}
                                    type="text"
                                    placeholder="Date of birth"
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">আহতের সংক্ষিপ্ত জীবনী (যদি জানা থাকে)</span>
                                </div>
                                <textarea
                                    placeholder="শহীদের সংক্ষিপ্ত জীবনী লিখুন"
                                    className="textarea text-[14px] textarea-bordered textarea-md w-full max-w-xs"
                                    {...register("bio", { required: false })}

                                    defaultValue={bio}
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
                                            defaultChecked={caseDone === "হয়েছে"} //TODO
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
                                            defaultChecked={caseDone === "হয়নি"} //TODO
                                            type="radio"
                                            value="হয়নি"
                                            name="caseDone"
                                            className="radio checked:bg-red-500" />
                                    </label>
                                </div>
                                <textarea
                                    {...register("caseDetails", { required: false })}
                                    defaultValue={caseDetails}
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

                                    defaultValue={sourceLink}
                                    type="text">
                                </textarea>
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">আহতের পরিবারের সাথে যোগাযোগের নাম্বার</span>
                                </div>
                                <input
                                    {...register("familyContact", { required: false })}

                                    defaultValue={familyContact}
                                    type="text"
                                    placeholder="Phone number"
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">আহতের ফেইসবুক আইডি (যদি জানা থাকে)</span>
                                </div>
                                <input
                                    {...register("fbId", { required: false })}

                                    defaultValue={fbId}
                                    type="text"
                                    placeholder="https://www.facebook.com/....."
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">আহতের সাথে আপনার সম্পর্ক (যদি থাকে)</span>
                                </div>
                                <input
                                    {...register("relationWithInfoProvider", { required: false })}

                                    defaultValue={relationWithInfoProvider}
                                    type="text"
                                    placeholder="Type here"
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                            </label>
                        </div>

                        <button className="btn btn-error btn-lg text-2xl font-bold text-white my-4">UPDATE</button>
                    </form>
                )}

                {/* -------------------Missing form update------------------*/}

                {category === "নিখোঁজ" && (
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-screen-lg flex flex-col gap-3">
                        <div className="rounded-[12px] flex bg-white w-4/5 shadow-sm mx-auto">
                            <div className="flex flex-col mx-auto md:mx-0">
                                <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                    <div className="flex -mt-2">
                                        <span className="label text-[16px]">ক্যাটাগরী</span>
                                        <span className="label text-[14px] font-bold text-red-500">* (Don't change this eventually)</span>
                                    </div>
                                    {errors.name && <span className="text-red-500">This field is required</span>}
                                </label>
                                <div className="flex justify-evenly gap-4 mb-4 -mt-2 mx-auto md:ml-4 w-full">
                                    <div className="form-control">
                                        <label className="label cursor-pointer gap-2">
                                            <span className="label-text">শহীদ</span>
                                            <input
                                                {...register("category", { required: true })}
                                                defaultChecked={category === "শহীদ"} //TODO
                                                type="radio"
                                                value="শহীদ"
                                                name="category"
                                                className="radio checked:bg-red-500" />
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label cursor-pointer gap-2">
                                            <span className="label-text">আহত</span>
                                            <input
                                                {...register("category", { required: true })}
                                                defaultChecked={category === "আহত"} //TODO
                                                type="radio"
                                                value="আহত"
                                                name="category"
                                                className="radio checked:bg-green-500" />
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label cursor-pointer gap-2">
                                            <span className="label-text font-bold">নিখোঁজ</span>
                                            <input
                                                {...register("category", { required: true })}
                                                defaultChecked={category === "নিখোঁজ"} //TODO
                                                type="radio"
                                                value="নিখোঁজ"
                                                name="category"
                                                className="radio checked:bg-blacl" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">নিখোঁজের নাম</span>
                                    <span className="label label-text text-[16px] font-bold text-red-500">*</span>
                                </div>
                                <input
                                    {...register("name", { required: true })}

                                    defaultValue={name}
                                    type="text"
                                    placeholder="Name"
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                                {errors.name && <span className="text-red-500">This field is required</span>}
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">কত তারিখ থেকে নিখোঁজের রয়েছেন?</span>
                                    <span className="label label-text text-[16px] font-bold text-red-500">*</span>
                                </div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Controller
                                        name="date"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={date} //TODO
                                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker
                                                    label="Select date"
                                                    value={value}
                                                    onChange={(newValue) => onChange(newValue)}
                                                    slotProps={{
                                                        textField: {
                                                            // {...params}
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
                                    <span className="label label-text text-[16px]">কোথায় থেকে নিখোঁজ হয়েছেন?</span>
                                    <span className="label label-text text-[16px] font-bold text-red-500">*</span>
                                </div>
                                <input
                                    {...register("place", { required: true })}
                                    defaultValue={place}
                                    type="text"
                                    placeholder="Place"
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                                {errors.name && <span className="text-red-500">This field is required</span>}
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">কিভাবে নিখোঁজ হয়েছেন? (যদি জানা থাকে)</span>
                                </div>
                                <textarea
                                    {...register("details", { required: false })}
                                    defaultValue={details}
                                    type="text"
                                    placeholder="ঘটনার বর্ণনা লিখুন"
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs">
                                </textarea>
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

                                    defaultValue={occupation}
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
                                    defaultValue={institution}
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
                                    defaultValue={age}
                                    type="text"
                                    placeholder="Type here"
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">অপরাধী কারা?</span>
                                </div>
                                <input
                                    {...register("culprit", { required: false })}
                                    defaultValue={culprit}
                                    type="text"
                                    placeholder="পুলিশ/বিজিবি/র‍্যাব/ছাত্রলীগ/অন্যান্য..."
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <div className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">নিখোঁজের একটি ছবি সংযুক্ত করুন (Only PNG/JPG)</span>
                                </div>
                                {/* Display existing image */}
                                <div className=" md:flex justify-between items-start">

                                    <div className="mb-4">
                                        <label className="label font-bold">Upload New Image</label>
                                        <input
                                            {...register("image")}
                                            type="file"
                                            className="file-input file-input-bordered w-full max-w-xs"
                                        />
                                    </div>
                                    {image && (
                                        <div className="mb-4">
                                            <label className="label font-bold">Existing Image</label>
                                            <img src={image} alt="Existing" className="w-[240px] h-[240px] rounded-lg max-w-xs" />
                                        </div>
                                    )}
                                </div>
                                {errors.image && <span className="text-red-500">This field is required</span>}
                            </div>
                        </div>

                        {/* ------------------- Personal Information ------------------- */}

                        <div className="text-center mt-8 mb-4 px-4 font-bold ">
                            <span>উক্ত নিখোঁজ ভাই/বোনের বিস্তারিত তথ্য দিয়ে সহযোগিতা করুন</span>
                        </div>


                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">পিতার নাম</span>
                                </div>
                                <input
                                    {...register("father", { required: false })}

                                    defaultValue={father}
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

                                    defaultValue={mother}
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

                                    defaultValue={address}
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

                                    defaultValue={permanentAddress}
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

                                    defaultValue={dateOfBirth}
                                    type="text"
                                    placeholder="Date of birth"
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">নিখোঁজের সংক্ষিপ্ত জীবনী (যদি জানা থাকে)</span>
                                </div>
                                <textarea
                                    placeholder="শহীদের সংক্ষিপ্ত জীবনী লিখুন"
                                    className="textarea text-[14px] textarea-bordered textarea-md w-full max-w-xs"
                                    {...register("bio", { required: false })}

                                    defaultValue={bio}
                                    type="text" >
                                </textarea>
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">সোর্স লিংক (ঘটনা সংশ্লিষ্ট পোস্ট, ছবি বা ভিডিও লিংক)</span>
                                </div>
                                <textarea placeholder="নিউজ লিংক, বা ফেইসবুক পোস্ট লিংক"
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs"
                                    {...register("sourceLink", { required: false })}

                                    defaultValue={sourceLink}
                                    type="text">
                                </textarea>
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">নিখোঁজের পরিবারের সাথে যোগাযোগের নাম্বার</span>
                                </div>
                                <input
                                    {...register("familyContact", { required: false })}

                                    defaultValue={familyContact}
                                    type="text"
                                    placeholder="Phone number"
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">নিখোঁজের ফেইসবুক আইডি (যদি জানা থাকে)</span>
                                </div>
                                <input
                                    {...register("fbId", { required: false })}

                                    defaultValue={fbId}
                                    type="text"
                                    placeholder="https://www.facebook.com/....."
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                            </label>
                        </div>
                        <div className="rounded-[12px] bg-white shadow-sm w-4/5 mx-auto">
                            <label className="form-control w-full pl-8 pr-8 py-6 my-auto">
                                <div className="flex mb-2 -mt-2">
                                    <span className="label label-text text-[16px]">নিখোঁজের সাথে আপনার সম্পর্ক (যদি থাকে)</span>
                                </div>
                                <input
                                    {...register("relationWithInfoProvider", { required: false })}

                                    defaultValue={relationWithInfoProvider}
                                    type="text"
                                    placeholder="Type here"
                                    className="input text-[14px] border-b-2 border-slate-300 hover:border-dotted focus:border-blue-400 w-full max-w-xs" />
                            </label>
                        </div>

                        <button className="btn btn-error btn-lg text-2xl font-bold text-white my-4">UPDATE</button>
                    </form>
                )}


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

export default EditInfo;