import GuestGuards from "../Guards/GuestGuards";
import MinimumLayout from "../Layout/MinimumLayout";
import ChangePassword from "../Pages/ChangePassword";
import ForgetPassword from "../Pages/ForgetPassword";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import VerifyOtp from "../Pages/VerifyOtp";

const guestRoutes = [
  {
    path: "/",
    element: <GuestGuards>
      <MinimumLayout />
    </GuestGuards>,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword/>,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp/>,
      },
      {
        path: "change-password",
        element: <ChangePassword/>,
      },
    ],
  },
];
export default guestRoutes;
