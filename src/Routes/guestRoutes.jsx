import MinimumLayout from "../Layout/MinimumLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const guestRoutes = [
  {
    path: "/",
    element: <MinimumLayout />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
];
export default guestRoutes;
