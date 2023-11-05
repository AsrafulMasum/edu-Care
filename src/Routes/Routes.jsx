import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Assignments from "../Pages/Assignments/Assignments";
import LogIn from "../Pages/LogIn/LogIn"
import SignUp from "../Pages/SignUp/SignUp"


const Routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement : <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: 'assignments',
        element: <Assignments></Assignments>
      },
    ]
  },
  {
    path: 'logIn',
    element: <LogIn></LogIn>
  },
  {
    path: 'signUp',
    element: <SignUp></SignUp>
  },
])

export default Routes;