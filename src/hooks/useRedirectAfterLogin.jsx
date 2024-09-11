import { useLocation, useNavigate } from 'react-router-dom';

const useRedirectAfterLogin = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const redirectToLogin = () => {
        navigate('/login', { state: { from: location }, replace: true });
    };

    const redirectAfterLogin = () => {
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
    };

    return { redirectToLogin, redirectAfterLogin };
};

export default useRedirectAfterLogin;