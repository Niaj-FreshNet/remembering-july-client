import { useLocation, useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import RadialProgress from "../components/RadialProgress/RadialProgress";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAdmin && !isAdminLoading) {
            // TODO: active navigate after publish reviewPending page
            navigate('/', { state: { from: location }, replace: true });
        }
    }, [loading, user, navigate, location]);

    if (loading || isAdminLoading) {
        return <RadialProgress></RadialProgress>
    }

    if (user && isAdmin) {
        return children;
    }

    // Optionally, you could return a fallback UI here, but `useEffect` will handle the redirection
    return null;
};

export default AdminRoute;