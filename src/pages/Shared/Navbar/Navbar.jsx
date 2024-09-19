import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";
import NavDrawer from "../NavDrawer/NavDrawer";
import SplidButton from "../../../components/SplidButton/SplidButton"
import { PiSignOutBold } from "react-icons/pi";
import { MdAdminPanelSettings } from "react-icons/md";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();
    const [scrolled, setScrolled] = useState(false); // Initialize state
    // const location = useLocation();
    // const isHomePage = location.pathname === "/";
    const [value, setValue] = useState(""); // State for the dropdown value
    const options = [
        { value: 'shaheedForm', label: 'Shaheed Form' },
        { value: 'injuredForm', label: 'Injured Form' },
        { value: 'missingForm', label: 'Missing Form' },
    ];

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // useEffect(() => {
    //     if (isHomePage) {
    //         window.addEventListener('scroll', handleScroll);
    //         return () => window.removeEventListener('scroll', handleScroll);
    //     }
    // }, [isHomePage]);

    const handleLogOut = async () => {
        await logOut();
        localStorage.removeItem('access-token');
    };


    const navOptions = (
        <ul className={`flex ${scrolled ? 'text-black' : 'text-white md:mt-'}`}>
            <li><NavLink to="/" className={({ isActive }) => isActive ? 'underline font-bold' : ''}>Home</NavLink></li>
            <li><NavLink to="/all" className={({ isActive }) => isActive ? 'underline font-bold' : ''}>All List</NavLink></li>
            <li><NavLink to="/gallery" className={({ isActive }) => isActive ? 'underline font-bold' : ''}>Gallery</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? 'underline font-bold' : ''}>About</NavLink></li>

            <>
                {user ? (
                    <li> <NavLink onClick={handleLogOut} className={({ isActive }) => isActive ? ' font-bold' : ''}>Sign Out <PiSignOutBold /></NavLink></li>
                ) : (
                    <li><NavLink to="/login" className={({ isActive }) => isActive ? ' font-bold' : ''}>Sign In</NavLink></li>
                )}
            </>

            {isAdmin && (
                <li className="font-bold italic underline">
                    <NavLink to="/dashboard/reviewPending">Admin <MdAdminPanelSettings className="text-2xl"/></NavLink>
                </li>
            )}
        </ul>
    );


    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };


    const handleSelectChange = (event) => {
        const { value } = event.target;
        setValue(value);
        // Navigate to the selected route
        location.pathname = `/${value}`;
    };


    return (
        <div className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-100 shadow-md' : 'bg-[#003F17] opacity-100'}`}>
            <div className={`flex items-center p-2 w-full ${scrolled ? 'lg:mt-0' : ''}`}>
                <div className="navbar-start flex">
                    <div>
                        <button tabIndex={0} role="button" className={`btn btn-ghost btn-md lg:hidden ${scrolled ? 'text-black' : 'text-white'}`} onClick={toggleDrawer}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="#000000"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className={`mt-2 md:ml-16 ${scrolled ? 'md:-mt-2 ' : 'md:pb-1 md:mt-1'}`}>
                        <Link to="/" className={`text-2xl md:font-bold ${scrolled ? 'md:text-3xl text-black' : 'md:text-3xl text-white'}`}>GENOCIDE</Link>
                    </div>
                </div>
                <div className="navbar-end flex items-center">
                    <div className="absolute hidden lg:right-36 lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navOptions}
                        </ul>
                    </div>
                    <div className="mr-2 lg:mr-8 lg:m">
                        <SplidButton />
                    </div>
                </div>
            </div>
            <NavDrawer open={drawerOpen} onClose={toggleDrawer} />
        </div>
    );
};

export default Navbar;
