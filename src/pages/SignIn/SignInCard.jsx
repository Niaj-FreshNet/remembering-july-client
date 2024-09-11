import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import ForgotPassword from './ForgotPassword';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import GoogleSignIn from '../../components/GoogleSignIn/GoogleSignIn';
import FacebookSignIn from '../../components/FacebookSignIn/FacebookSignIn';
import useAuth from '../../hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useRedirectAfterLogin from '../../hooks/useRedirectAfterLogin';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function SignInCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const { signIn } = useAuth();
  const { redirectAfterLogin } = useRedirectAfterLogin();


  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateInputs()) {
      const data = new FormData(event.currentTarget);

      const email = data.get('email');
      const password = data.get('password');
      console.log(email, password);

      if (!email || !password) {
        toast.error('Email and password are required');
        return;
      }

      signIn(email, password)
        .then(result => {
          console.log('manual login user:', result.user?.email, result.user);
          toast.success("Congratulations! Signed In Successfully");
          redirectAfterLogin();
          window.scrollTo(0, 0); // Scroll to top
        })
    }
  };




  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 4) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 4 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: '1rem' }}>
      <Box>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center', fontWeight: 'bold' }}
        >
          Sign in
        </Typography>
        {/* <SitemarkIcon /> */}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

        <GoogleSignIn />
        <FacebookSignIn />

      </Box>

      <Divider sx={{ my: 2 }}>or</Divider>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">Password</FormLabel>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button type="submit" fullWidth variant="contained" sx={{ fontWeight: 'bold', backgroundColor: 'green' }}>
          Sign in
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <a
            href="/signup"
            variant="body2"
            className='underline font-bold text-blue-500'
          >
            Sign up
          </a>
        </Typography>
      </Box>
      {/* <Link
        component="button"
        onClick={handleClickOpen}
        variant="body2"
      >
        <ForgotPassword open={open} handleClose={handleClose} />
        Forgot your password?
      </Link> */}
      <ToastContainer />
    </Card>
  );
}





// ............................... previous

// import { Link, useLocation, useNavigate } from "react-router-dom";
// import SocialLogin from "../../components/SocialLogin/SocialLogin";
// import useAuth from "../../hooks/useAuth";
// import useRedirectAfterLogin from "../../hooks/useRedirectAfterLogin";

// const Login = () => {
//     const { signIn } = useAuth();
//     const { redirectAfterLogin } = useRedirectAfterLogin();

//     const handleLogin = e => {
//         e.preventDefault();
//         const form = e.target;
//         const email = form.email.value;
//         const username = form.username.value;
//         const password = form.password.value;
//         console.log(email, username, password);

//         signIn(email, password)
//             .then(result => {
//                 console.log('manual login user:', result.user?.email, result.user);
//                 redirectAfterLogin();
//             })
//     }

//     return (
//         <div>
//             <div className="hero flex flex-col bg-base-200 min-h-screen">
//                 <div className="mx-auto my-auto">
//                     <div className="text-center mb-6">
//                         <h1 className="text-5xl font-bold">Login</h1>
//                     </div>
//                     <div className="hero-content flex-col lg:flex-row-reverse">
//                         <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//                             <form onSubmit={handleLogin} className="card-body">
//                                 <p>Email</p>
//                                 <label className="input input-bordered flex items-center gap-2 mb-2">
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 16 16"
//                                         fill="currentColor"
//                                         className="h-4 w-4 opacity-70">
//                                         <path
//                                             d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
//                                         <path
//                                             d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
//                                     </svg>
//                                     <input type="email" name="email" className="grow" placeholder="example@gmail.com" />
//                                 </label>
//                                 <p>Username</p>
//                                 <label className="input input-bordered flex items-center gap-2 mb-2">
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 16 16"
//                                         fill="currentColor"
//                                         className="h-4 w-4 opacity-70">
//                                         <path
//                                             d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
//                                         <path
//                                             d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
//                                     </svg>
//                                     <input type="text" name="username" className="grow" placeholder="example.1" />
//                                 </label>
//                                 <p>Password</p>
//                                 <label className="input input-bordered flex items-center gap-2">
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 16 16"
//                                         fill="currentColor"
//                                         className="h-4 w-4 opacity-70">
//                                         <path
//                                             fillRule="evenodd"
//                                             d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
//                                             clipRule="evenodd" />
//                                     </svg>
//                                     <input type="password" name="password" className="grow" placeholder="Password" required />
//                                 </label>
//                                 <div className="form-control mt-6">
//                                     <button className="btn btn-primary">Login</button>
//                                 </div>
//                             </form>
//                             <p className="ml-8"><small>Already have an account <Link to="/signup" className="text-blue-600 underline">Sign up</Link></small></p>
//                             <SocialLogin></SocialLogin>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;
