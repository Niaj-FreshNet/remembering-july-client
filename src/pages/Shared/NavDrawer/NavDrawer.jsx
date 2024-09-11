import { NavLink } from 'react-router-dom';
import useAdmin from '../../../hooks/useAdmin';
import { Button } from '@mui/material';
import useAuth from '../../../hooks/useAuth';


const NavDrawer = ({ open, onClose }) => {
    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();

    const handleLogOut = async () => {
        await logOut();
        localStorage.removeItem('access-token');
    };

    const handleLogOutAndClose = () => {
        handleLogOut();
        onClose();
      };


    return (
        <div className={`fixed inset-0 z-50 transform ${open ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-gray-800 bg-opacity-25`}>
            <div onClick={onClose} className="w-3/5 md:w-4/5 h-screen absolute right-0">
            </div>
            <div className="flex flex-row bg-white w-60 h-full shadow-xl pl-6 pr-2 py-8">
                <nav className="w-5/6">
                    <ul className="flex flex-col space-y-2 text-base">
                        <li>
                            <NavLink
                                to="/"
                                onClick={onClose}
                                style={{ textDecoration: 'none' }}
                            >
                                {({ isActive }) => (
                                    <Button
                                        variant={isActive ? "contained" : "outlined"}
                                        color={isActive ? "success" : "primary"}
                                    >
                                        Home
                                    </Button>
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/all"
                                onClick={onClose}
                                style={{ textDecoration: 'none' }}
                            >
                                {({ isActive }) => (
                                    <Button
                                        variant={isActive ? "contained" : "outlined"}
                                        color={isActive ? "success" : "primary"}
                                    >
                                        All List
                                    </Button>
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/gallery"
                                onClick={onClose}
                                style={{ textDecoration: 'none' }}
                            >
                                {({ isActive }) => (
                                    <Button
                                        variant={isActive ? "contained" : "outlined"}
                                        color={isActive ? "success" : "primary"}
                                    >
                                        Gallery
                                    </Button>
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/shaheedForm"
                                onClick={onClose}
                                style={{ textDecoration: 'none' }}
                            >
                                {({ isActive }) => (
                                    <Button
                                        variant={isActive ? "contained" : "outlined"}
                                        color={isActive ? "success" : "primary"}
                                    >
                                        Shaheeds' Form
                                    </Button>
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/injuredForm"
                                onClick={onClose}
                                style={{ textDecoration: 'none' }}
                            >
                                {({ isActive }) => (
                                    <Button
                                        variant={isActive ? "contained" : "outlined"}
                                        color={isActive ? "success" : "primary"}
                                    >
                                        Injureds' Form
                                    </Button>
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/missingForm"
                                onClick={onClose}
                                style={{ textDecoration: 'none' }}
                            >
                                {({ isActive }) => (
                                    <Button
                                        variant={isActive ? "contained" : "outlined"}
                                        color={isActive ? "success" : "primary"}
                                    >
                                        Missings' Form
                                    </Button>
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                onClick={onClose}
                            >
                                {({ isActive }) => (
                                    <Button
                                        variant={isActive ? "contained" : "outlined"}
                                        color={isActive ? "success" : "primary"}
                                    >
                                        About
                                    </Button>
                                )}
                            </NavLink>
                        </li>
                    </ul>
                    <div className="mt-4">
                        {user ? (
                            <button onClick={handleLogOutAndClose}  className="btn">Sign Out</button>
                        ) : (
                            <button onClick={onClose}><NavLink to="/login" className="btn">Sign In</NavLink></button>
                        )}
                    </div>
                    <div className='mt-5'>
                        {isAdmin && (
                            <NavLink
                                to="/dashboard/reviewPending"
                                onClick={onClose}
                                style={{ textDecoration: 'none' }}
                            >
                                {({ isActive }) => (
                                    <Button
                                        variant={isActive ? "outlined" : "contained"}
                                        color={isActive ? "success" : "error"}
                                        className="w-2/3"
                                    >
                                        Admin
                                    </Button>
                                )}
                            </NavLink>
                        )}
                    </div>
                </nav>
                <button onClick={onClose} className="btn rounded-btn text-3xl border-2 border-gray-300">X</button>
            </div>
        </div>
    );
};
export default NavDrawer;
