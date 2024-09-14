import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlogPageDetails, SingleBlog } from "./pages";
import Blog from "../src/pages/blog/BlogPage";
import Subscription from "./pages/Subscription";
import Contact from "./pages/contact/Contact";
import Search from "./pages/search/Search";
import { useTheme } from "./utils/themeContext";
import Header from "./components/header/Header";
import { FiMoon, FiSun } from "react-icons/fi";
import About from "./pages/About/About";
import Footer from "./components/footer/Footer";
import Profile from "./pages/Profile/Profile";
import SubscriptionAnnually from "./pages/SubscriptionAnnually";
import Home from "./pages/home/Home";
import SignUp from "./pages/forms/SignUp";
import UploadPage from "./pages/uploadPage/UploadPage";
import SuperAdmin from "./pages/superAdmin/SuperAdmin";
import Login from "./pages/forms/Login";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/not-found/NotFound";

function App() {
  const { toggleTheme } = useTheme();

  const initialTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (initialTheme !== theme) {
      toggleTheme(initialTheme);
    }
  }, [initialTheme, theme, toggleTheme]);

  return (
    <div className={`app ${theme}`}>
      <button
        className={`toggle-button ${theme}`}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "dark" ? <FiSun /> : <FiMoon />}
        <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
      </button>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/upload" element={<UploadPage />} />
            {/* <Route path='/login' element={<Login />} /> */}
            {/* <Route path='/sign-up' element={<SignUp />} /> */}
            {/* <Route path='/forgot-password' element={<ForgotPassword />} /> */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog-details" element={<BlogPageDetails />} />
            <Route path="/Subscription" element={<Subscription />} />
            <Route
              path="/subscription-Annually"
              element={<SubscriptionAnnually />}
            />
            <Route path="/blog/:id" element={<SingleBlog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile/:id" element={<Profile />} />

            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/super-admin-dashboard" element={<SuperAdmin />} />

            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;