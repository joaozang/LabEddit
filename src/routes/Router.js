import { LoginPage } from "../pages/LoginPage/LoginPage";
import { FeedPage } from "../pages/FeedPage/FeedPage";
import { PostPage } from "../pages/PostPage/PostPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}
