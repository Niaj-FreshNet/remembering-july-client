import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Shaheed from "../pages/Shaheed/Shaheed";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>,
            // loader: () => fetch('http://localhost:5000/cards')
        },
        {
          path: '/shaheed',
          element: <Shaheed></Shaheed>
        }
      ]
    },
  ]);