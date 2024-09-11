import { NavLink } from 'react-router-dom';
import { Badge, Button } from '@mui/material';
import useAdmin from '../../../hooks/useAdmin';
import useAuth from '../../../hooks/useAuth';
import usePending from '../../../hooks/usePending';


const DashboardDrawer = ({ open, onClose }) => {
    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();
    const { pendingCards, loading, refetch } = usePending();

    const handleLogOut = async () => {
        await logOut();
        localStorage.removeItem('access-token');
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
                                to="/dashboard/reviewPending"
                                onClick={onClose}
                                style={{ textDecoration: 'none' }}
                            >
                                {({ isActive }) => (
                                    <Badge badgeContent={pendingCards.length} color='error'>
                                        <Button
                                            variant={isActive ? "contained" : "outlined"}
                                            color={isActive ? "success" : "primary"}
                                        >
                                            Pending Reviews </Button>
                                    </Badge>
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/reviewGallery"
                                onClick={onClose}
                                style={{ textDecoration: 'none' }}
                            >
                                {({ isActive }) => (
                                    <Button
                                        variant={isActive ? "contained" : "outlined"}
                                        color={isActive ? "success" : "primary"}
                                    >
                                        Review Gallery
                                    </Button>
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/reviewVerified"
                                onClick={onClose}
                                style={{ textDecoration: 'none' }}
                            >
                                {({ isActive }) => (
                                    <Button
                                        variant={isActive ? "contained" : "outlined"}
                                        color={isActive ? "success" : "primary"}
                                    >
                                        Verified Submits
                                    </Button>
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/reviewDeclined"
                                onClick={onClose}
                            >
                                {({ isActive }) => (
                                    <Button
                                        variant={isActive ? "contained" : "outlined"}
                                        color={isActive ? "success" : "primary"}
                                    >
                                        Rejected Submits
                                    </Button>
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/allUsers"
                                onClick={onClose}
                                style={{ textDecoration: 'none' }}
                            >
                                {({ isActive }) => (
                                    <Button
                                        variant={isActive ? "contained" : "outlined"}
                                        color={isActive ? "success" : "primary"}
                                        className="w-full"
                                    >
                                        All Users
                                    </Button>
                                )}
                            </NavLink>
                        </li>
                    </ul>
                    <div className="mt-4">
                        {user ? (
                            <button onClick={handleLogOut} className="btn">Sign Out</button>
                        ) : (
                            <button><Link to="/login" className="btn">Sign In</Link></button>
                        )}
                    </div>
                    <div className='mt-5'>
                        <NavLink
                            to="/"
                            onClick={onClose}
                            style={{ textDecoration: 'none' }}
                        >
                            {({ isActive }) => (
                                <Button
                                    variant={isActive ? "outlined" : "contained"}
                                    color={isActive ? "success" : "error"}
                                    className="w-full"
                                >
                                    Basic User
                                </Button>
                            )}
                        </NavLink>
                    </div>
                </nav>
                <button onClick={onClose} className="btn rounded-btn text-3xl border-2 border-gray-300 ml-2">X</button>
            </div>
        </div>
    );
};

export default DashboardDrawer;