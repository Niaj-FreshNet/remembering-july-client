import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import FacebookSignIn from '../../components/FacebookSignIn/FacebookSignIn';
import GoogleSignIn from '../../components/GoogleSignIn/GoogleSignIn';
import useAuth from '../../hooks/useAuth';
import useRedirectAfterLogin from '../../hooks/useRedirectAfterLogin';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

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

export default function SignUpCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');

  const { createUser, updateUserProfile } = useAuth();
  const { redirectAfterLogin } = useRedirectAfterLogin();
  const axiosPublic = useAxiosPublic();


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) {
      return;
    }

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const name = data.get('name');
    const phone = data.get('phone');

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name);
      const userInfo = {
        name: name,
        email: email,
        phone: phone,
        password: password,
        creationTime: result.user?.metadata?.creationTime,
      };
      const res = await axiosPublic.post('/users', userInfo);
      if (res.data.insertedId) {
        console.log(res.data);
        toast.success('Congratulations! Signed Up Successfully');
        redirectAfterLogin();
        window.scrollTo(0, 0);
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setEmailError(true);
        setEmailErrorMessage('This email is already in use.');
      } else {
        toast.error(error.message);
      }
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (password.value !== confirmPassword.value) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('Passwords do not match.');
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: '1rem' }}>
        {/* <SitemarkIcon /> */}
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center', fontWeight: 'bold' }}
        >
          Sign up
        </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

          <GoogleSignIn />
          <FacebookSignIn />

        </Box>
        <Divider>or</Divider>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <TextField
            // error={nameError}
            // helperText={nameErrorMessage}
            id="name"
            type="text"
            name="name"
            placeholder="Type your name"
            autoComplete="name"
            autoFocus
            required
            fullWidth
            variant="outlined"
          // color={nameError ? 'error' : 'primary'}
          />
        </FormControl>
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
          <FormLabel htmlFor="phone">Phone (optional)</FormLabel>
          <TextField
            // error={phoneError}
            // helperText={phoneErrorMessage}
            id="phone"
            type="text"
            name="phone"
            placeholder="017......."
            autoComplete="phone"
            autoFocus
            required
            fullWidth
            variant="outlined"
          // color={phoneError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="new-password"
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
          <TextField
            error={confirmPasswordError}
            helperText={confirmPasswordErrorMessage}
            name="confirm-password"
            placeholder="••••••"
            type="password"
            id="confirm-password"
            autoComplete="new-password"
            required
            fullWidth
            variant="outlined"
            color={confirmPasswordError ? 'error' : 'primary'}
          />
        </FormControl>
        <Button type="submit" fullWidth variant="contained" onClick={validateInputs} sx={{ fontWeight: 'bold', backgroundColor: 'green' }}>
          Sign up
        </Button>
        {/* <Typography sx={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <Link
            href="/login"
            variant="body2"
          >
            Sign In
          </Link>
        </Typography> */}
        <Typography sx={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <a
            href="/login"
            variant="body2"
            className='underline font-bold text-blue-500'
          >
            Sign in
          </a>
        </Typography>
      </Box>
      <ToastContainer />
    </Card>
  );
}






// .............................................. previous


// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import useAuth from "../../hooks/useAuth";
// import SocialLogin from "../../components/SocialLogin/SocialLogin";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import useRedirectAfterLogin from "../../hooks/useRedirectAfterLogin";


// const SignUp = () => {

//     const { createUser, updateUserProfile } = useAuth();
//     const axiosPublic = useAxiosPublic();
//     const { register, handleSubmit, reset, formState: { errors } } = useForm();
//     const { redirectAfterLogin } = useRedirectAfterLogin();


//     const onSubmit = (data) => {
//         console.log(data);

//         createUser(data.email, data.password)
//             .then(result => {
//                 // console.log(result.user)

//                 updateUserProfile(data.name)
//                     .then(() => {
//                         // create user entry in the database
//                         console.log('user profile updated')
//                         const userInfo = {
//                             name: data.name,
//                             username: data.username,
//                             email: data.email,
//                             password: data.password,
//                             creationTime: result.user?.metadata?.creationTime
//                         }
//                         axiosPublic.post('/users', userInfo)
//                             .then(res => {

//                             });
//                             redirectAfterLogin();
//                     })
//             })
//     }

//     return (
//         <div>
//             <div className="hero flex flex-col bg-base-200 min-h-screen">
//                 <div className="mx-auto my-auto">
//                     <div className="text-center mb-6">
//                         <Link to="/login"><h1 className="text-5xl font-bold">Login</h1></Link>
//                         <h1>||</h1>
//                         <Link to="/signup"><h1 className="text-5xl font-bold">Sign Up</h1></Link>
//                     </div>
//                     <div className="hero-content flex-col lg:flex-row-reverse">
//                         <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//                             <form onSubmit={handleSubmit(onSubmit)} className="card-body">
//                                 <p>Name</p>
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
//                                     <input type="text" {...register("name", { required: true })} className="grow" placeholder="Example" />
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
//                                     <input type="text" {...register("username", { required: true })} className="grow" placeholder="example.1" />
//                                 </label>
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
//                                     <input type="email" {...register("email", { required: true })} className="grow" placeholder="example@gmail.com" />
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
//                                     <input type="password" {...register("password", { required: true })} className="grow" placeholder="Password" required />
//                                 </label>
//                                 <div className="form-control mt-6">
//                                     <button className="btn btn-primary">Sign Up</button>
//                                 </div>
//                             </form>
//                             <p className="ml-8"><small>Already have an account <Link to="/login" className="text-blue-600 underline">Login</Link></small></p>
//                             <SocialLogin></SocialLogin>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


// export default SignUp;