import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBav from "./components/NavBav";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import Signup from "./pages/Signup";
import NoPage from "./pages/NoPage";

const App = () => {
    return(
        <>
        
        <BrowserRouter>
        <NavBav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="library" element={<Library />} />
                <Route path="reports" element={<Reports />} />
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default App;