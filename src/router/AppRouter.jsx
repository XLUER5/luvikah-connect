import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { FeedPage } from "../pages/FeedPage";
import { ProfilePage } from "../pages/ProfilePage";
import { PrivateRoutes } from "../auth/PrivateRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route
        path="/posts"
        element={
          <PrivateRoutes>
            <FeedPage />
          </PrivateRoutes>
        }
      ></Route>
      <Route
        path="/profile/:user"
        element={
          <PrivateRoutes>
            <ProfilePage />
          </PrivateRoutes>
        }
      ></Route>
      <Route path="/*" element={<LoginPage />}></Route>
    </Routes>
  );
};
