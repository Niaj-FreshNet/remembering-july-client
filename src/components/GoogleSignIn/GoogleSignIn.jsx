import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useRedirectAfterLogin from "../../hooks/useRedirectAfterLogin";
import { Button } from "@mui/material";
import { GoogleIcon } from "../../pages/SignIn/CustomIcons";
import { toast, ToastContainer } from "react-toastify";



const GoogleSignIn = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { redirectAfterLogin } = useRedirectAfterLogin();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user.displayName);
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    phoneNumber: result.user?.phoneNumber,
                    photoURL: result.user?.photoURL,
                    creationTime: result.user?.metadata?.creationTime
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        toast.success("Congratulations! Signed In Successfully");
                        redirectAfterLogin();
                        window.scrollTo(0, 0); // Scroll to top
                    })
            })
    }
    return (
        // <div className="p-8">
        //     <div className="divider">
        //         <p>Sign in with socials</p>
        //     </div>
        //     <div>
        //         <button onClick={handleGoogleSignIn}
        //             className="btn btn-outline btn-warning mt-4">Google
        //         </button>
        //     </div>
        // </div >
        <Button
            type="button"
            fullWidth
            variant="outlined"
            onClick={handleGoogleSignIn}
            startIcon={<GoogleIcon />}
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
        >
            Sign in with Google
            <ToastContainer />
        </Button>
    );
};

export default GoogleSignIn;