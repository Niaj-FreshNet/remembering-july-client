import React, { useEffect, useState } from "react";
import useCards from "../../hooks/useCards";
import { Link, useParams } from "react-router-dom";
import './DetailedPage.css'
import useAdmin from "../../hooks/useAdmin";
import { FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from "react-share";
import { FacebookIcon } from "../SignIn/CustomIcons";
import { Button } from "@mui/material";
import { CiShare2 } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import dayjs from "dayjs";
import Spinner from "./Spinner";

const DetailedPage = () => {

    const [cards, loading] = useCards();
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [isAdmin, isAdminLoading] = useAdmin();
    const [showShareOptions, setShowShareOptions] = React.useState(false);


    useEffect(() => {
        if (!loading) {
            const foundDetails = cards.find((card) => card._id === id);
            setDetails(foundDetails || {});
            console.log(foundDetails)
        }
    }, [cards, loading, id]);

    if (loading) {
        return <Spinner />; // Show Spinner when loading   {/* :::::::CHATGPT:::::: Kindly set a loader on the full viewport (i've a component spinner) */}
    }

    if (!details) {
        return <div>No details found</div>;
    }


    const handleShareClick = () => {
        setShowShareOptions(!showShareOptions);
    }


    const shareUrl = `${window.location.origin}/cards/${details._id}`;
    const title = `${details.name} - ${details.category} at ${details.date}`;




    return (
        <div className="max-w-screen-lg mx-auto my-2 px-6 py-6 text-pretty">
            {/* Mobile Header */}
            <div className="flex">
                <div className="flex gap-4 items-start mx-auto mb-4 px-6 md:hidden">
                    <div className="badge rounded-lg bg-red-700 text-white px-2 py-4 mt-1 font-extrabold">
                        <p>{details.category}</p>
                    </div>
                    <div className="text-3xl font-semibold">
                        <span>{details.name}</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="md:flex md:space-x-8">
                {/* Left Column (Image and Details) */}
                <div className="w-full md:w-1/2 space-y-4">

                    <div className="flex flex-col gap-0">
                        <div className="hidden md:flex md:justify-between md:items-end md:ml-1 md:-mr-2">
                            <div>
                                <p className="text-sm italic">Last updated: {details.submissionDate}</p>
                            </div>
                            <div className="flex -mb-2 space-x-2">
                                {showShareOptions && (
                                    <div className="flex items-center space-x-2">
                                        <FacebookShareButton url={shareUrl} quote={title}>
                                            <FaFacebook size={28} color="#316FF6" round />
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
                                <Button onClick={handleShareClick} size="2px" color="primary" sx={{ border: 0 }}>
                                    <CiShare2 size={30} />
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-center py-4">
                            <img
                                className="w-full h-auto object-cover rounded-lg"
                                src={details.image}
                                alt={details.name}
                            />
                        </div>
                        <div className="flex justify-between items-start ml-1 -mr-2 -mb-4 md:hidden">
                            <div>
                                <p className="text-sm italic">Last updated: {details.submissionDate}</p>
                            </div>
                            <div className="flex -mt-3 space-x-2">
                                {showShareOptions && (
                                    <div className="flex items-center space-x-2">
                                        <FacebookShareButton url={shareUrl} quote={title}>
                                            <FacebookIcon size={32} round />
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
                                <Button onClick={handleShareClick} size="2px" color="primary" sx={{ border: 0 }}>
                                    <CiShare2 size={30} />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-6">
                        <div>
                            <span className="death-info">শাহাদাতবরণ করেনঃ</span> <span className="death-info-value">{details.date}</span>
                        </div>
                        <div>
                            <span className="death-info">যেখানে শহীদ হনঃ</span> <span className="death-info-value">{details.place}</span>
                        </div>
                        <br />
                        <div className="bg-gray-200 rounded-lg p-2 space-y-2">
                            <div className="death-info-details">যেভাবে শহীদ হয়েছেনঃ</div> <div className="death-info-details-value">{details.details}</div>
                        </div>
                        <br />
                        <div>
                            <span className="death-info">যে অস্ত্রের আঘাতে শহীদ হনঃ</span> <span className="death-info-value">{details.weaponUsed}</span>
                        </div>
                        <div>
                            <span className="death-info">অপরাধী/খুনী যারাঃ</span> <span className="death-info-value">{details.culprit}</span>
                        </div>
                        <div>
                            <span className="death-info">অপরাধীদের বিচারঃ</span> <span className="death-info-value">{details.caseDetails}</span>
                        </div>
                    </div>
                </div>

                {/* Right Column (Name and Biography) */}
                <div className="w-full md:w-1/2 space-y-8 md:ml-8">
                    {/* Desktop Header */}
                    <div className="hidden md:flex items-start mb-6">
                        <div className="badge absolute rounded-lg bg-red-700 text-white px-2 py-4 mt-1 font-bold">
                            <p>{details.category}</p>
                        </div>
                        <div className="text-3xl font-semibold px-6 ml-16">
                            <span>{details.name}</span>
                        </div>
                    </div>

                    <div className="bg-gray-100 rounded-lg p-6">
                        <div>
                            <span className="details-info">পিতার নামঃ</span> <span className="details-info-value">{details.father}</span>
                        </div>
                        <div>
                            <span className="details-info">মাতার নামঃ</span> <span className="details-info-value">{details.mother}</span>
                        </div>
                        <div>
                            <span className="details-info">জন্মতারিখঃ</span> <span className="details-info-value">{details.dateOfBirth}</span>
                        </div>
                        <div>
                            <span className="details-info">স্থায়ী ঠিকানাঃ</span> <span className="details-info-value">{details.permanentAddress}</span>
                        </div>
                        <br />
                        <div>
                            <span className="details-info">বয়সঃ</span> <span className="details-info-value">{details.age}</span>
                        </div>
                        <div>
                            <span className="details-info">পেশাঃ</span> <span className="details-info-value">{details.occupation}</span>
                        </div>
                        <div>
                            <span className="details-info">প্রতিষ্ঠানঃ</span> <span className="details-info-value">{details.institution}</span>
                        </div>
                        <div>
                            <span className="details-info">যেখানে থাকতেনঃ</span> <span className="details-info-value">{details.address}</span>
                        </div>
                    </div>
                    <div className="bg-gray-200 max-w-screen-sm rounded-lg p-4">
                        <div className="space-y-2">
                            <div className="bio">সংক্ষিপ্ত জীবনীঃ</div> <div className="bio-value">{details.bio}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            {details.images && details.images.length > 0 && (
                <>
                    <div className="max-w-screen-lg mx-auto px-6 py-8">
                        <h2 className="text-2xl font-semibold mb-6 text-center">গ্যালারী</h2>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {/* Example Image */}
                            {details.images.map((image, index) => (
                                <div key={index} className="relative overflow-hidden rounded-lg">
                                    <img
                                        src={image.src}
                                        alt={`Martyr Image ${index + 1}`}
                                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
            {(
                <>
                    <div className="max-w-screen-lg p-4 md:p-6 space-y-2">
                        <p className="font-bold underline">Info. Sources:</p>
                        <ul className="list-disc pl-6">
                            <li className="italic"> {details.sourceLink} </li>
                        </ul>
                    </div>
                </>
            )}
            {
                isAdmin ?
                    <>
                        <div className="max-w-screen-2xl text-center mt-6">
                            {/* <li className="font-bold italic underline"><Link to={`/dashboard/editInfo/${_id}`}>Edit Info</Link></li> */}
                            <Link to={`/dashboard/editInfo/${details._id}`}>
                                <button className="btn btn-error px-4 py-2 text-white rounded">
                                    Edit Info
                                </button>
                            </Link>
                        </div>
                    </> : <>
                        <span></span>
                    </>
            }
        </div >
    );
};

export default DetailedPage;