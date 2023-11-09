import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({children}) => {
  const userData = localStorage.getItem("user");
  return userData ? children : <Navigate to="/" />;
};
