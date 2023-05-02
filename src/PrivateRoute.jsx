import { UserAuth } from "./context/Auth";
import { Navigate, Outlet } from "react-router";

export default function PrivateRoute({ component: RouteComponent, ...rest }) {
  const { currentUser } = UserAuth();

  // navigates to the login page (home route) if user is not logged in
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // navigates to the protected dashboard page nested in the PrivateRoute route in the App.jsx component if user is logged in
  return <Outlet />;
}
