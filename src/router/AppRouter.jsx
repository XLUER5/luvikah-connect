import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { FeedPage } from "../pages/FeedPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/posts" element={<FeedPage />}></Route>
    </Routes>
  );
};
