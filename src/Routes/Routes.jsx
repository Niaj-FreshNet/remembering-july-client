import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/SignIn/SignInCard";
import SignUp from "../pages/SignUp/SignUpCard";
import AllUsers from "../pages/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Dashboard from "../layout/Dashboard";
import ReviewPending from "../pages/Dashboard/ReviewPending/ReviewPending";
import Submitted from "../pages/Dashboard/Submitted/Submitted";
import Verified from "../pages/Dashboard/Verified/Verified";
import Declined from "../pages/Dashboard/Declined/Declined";
import GalleryReview from "../pages/Dashboard/Verified/GalleryReview";
import FormShaheed from "../pages/Form/FormShaheed/FormShaheed";
import FormInjured from "../pages/Form/FormInjured/FormInjured";
import FormMissing from "../pages/Form/FormMissing/FormMissing";
import Gallery from "../pages/Gallery/Gallery";
import Contact from "../pages/About/About";
import DetailedPage from "../pages/DetailedPage/DetailedPage";
import EditInfo from "../pages/Dashboard/EditInfo/EditInfo";
import AllList from "../pages/AllLists/AllListPage/AllListPage";
import AllListPage from "../pages/AllLists/AllListPage/AllListPage";
import LazyLoadReviewPending from "../components/LazyLoad/LazyLoadReviewPending/LazyLoadReviewPending";
import SignInPage from "../pages/SignIn/SignInPage";
import SignUpPage from "../pages/SignUp/SignUpPage";
import About from "../pages/About/About";
import UnderConstructionPage from "../components/UnderConstruction/UnderConstructionPage/UnderConstructionPage";
import GalleryPage from "../pages/Gallery/GalleryPage";



const isUnderConstruction = true;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    // errorElement: <UnderConstructionPage />,
    children: [

      // visitor routes
      {
        path: '/',
        element: <Home></Home>
      },

      // {/* replaced "card/:id" with "info/:id" */}
      {
        path: 'info/:id',  
        element: <DetailedPage></DetailedPage>
      },

      {
        path: 'all',
        element: <AllListPage></AllListPage>
      },
      // {
      //   path: 'gallery',
      //   element: isUnderConstruction ? <UnderConstructionPage /> : <Gallery />
      // },
      {
        path: 'gallery',
        element: <GalleryPage></GalleryPage>
      },
      {
        path: 'about',
        element: isUnderConstruction ? <UnderConstructionPage /> : <About />
      },
      {
        path: 'login',
        element: <SignInPage></SignInPage>
      },
      {
        path: 'signup',
        element: <SignUpPage></SignUpPage>
      },

      // user routes (forms)
      {
        path: 'shaheedForm',
        element: <PrivateRoute><FormShaheed></FormShaheed></PrivateRoute>
      },
      {
        path: 'injuredForm',
        element: <PrivateRoute><FormInjured></FormInjured></PrivateRoute>
      },
      {
        path: 'missingForm',
        element: <PrivateRoute><FormMissing></FormMissing></PrivateRoute>
      }
    ]
  },

  // Dashboard routes
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [

      {
        path: 'submitted',
        element: <Submitted></Submitted>
      },


      // admin only
      {
        path: 'reviewPending',
        element: <AdminRoute><LazyLoadReviewPending></LazyLoadReviewPending></AdminRoute>
      },
      {
        path: 'reviewVerified',
        element: <AdminRoute><Verified></Verified></AdminRoute>
      },
      {
        path: 'reviewDeclined',
        element: <AdminRoute><Declined></Declined></AdminRoute>
      },
      {
        path: 'reviewGallery',
        element: <AdminRoute><GalleryReview></GalleryReview></AdminRoute>
      },
      {
        path: 'editInfo/:id',
        element: <AdminRoute><EditInfo></EditInfo></AdminRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/cards/${params.id}`)
      },
      {
        path: 'allUsers',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      }
    ]
  },
]);