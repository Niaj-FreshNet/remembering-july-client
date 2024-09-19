import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";

import DashboardNavbar from "../pages/Shared/DashboardNavbar/DashboardNavbar";


const Dashboard = () => {

    return (
        <div>
            <DashboardNavbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Dashboard;