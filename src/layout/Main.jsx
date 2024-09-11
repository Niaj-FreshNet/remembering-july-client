import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";

const Main = () => {
    return (
        <div className="relative">
            <Navbar />
            <div className="max-w-screen-2xl mx-auto">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;