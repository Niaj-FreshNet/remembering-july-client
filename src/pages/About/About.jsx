import { Helmet } from "react-helmet-async";

const About = () => {
    const style = {
        background: 'none', /* Removes the background image */
        backgroundColor: '#fff', /* Optional: Sets a solid color */
    };
    return (
        <div className="my-10 mx-2">
            <Helmet>
                <title>About - GENOCIDE 2024</title>
            </Helmet>
            <div>
                <div className="max-w-screen-md mx-auto my-auto text-pretty text-center text-white space-y-8">
                    <h2 className="text-4xl">Genocide 2024</h2>
                    <p>জুলাই-আগষ্ট ২০২৪ গণহত্যায় শহীদ, আহত ও নিখোঁজদের তথ্য এবং গণহত্যা সংশ্লিষ্ট যেকোনো ছবি বা ভিডিও আপলোড করে পরবর্তী প্রজন্মকে বীর বাঙালীর ইতিহাস দেখার সুযোগ করে দিন।</p>
                    <p>সার্বিক তত্ত্বাবধায়নেঃ <br />এম.আই নিয়াজ <br />শিক্ষার্থী, বাংলাদেশ টেক্সটাইল বিশ্ববিদ্যালয় (বুটেক্স)।</p>
                    <p>সোস্যাল মিডিয়া প্লাটফর্মসঃ <br /> <a className="underline text-sky-400" href="https://www.facebook.com/genocide2024">www.facebook.com/genocide2024</a></p>
                </div>
            </div>
        </div>
    );
};

export default About;