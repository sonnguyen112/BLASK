import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline  from "@mui/material/CssBaseline";
import NavBav from "./components/NavBav";
import ScrollTop from "./components/ScrollTop";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import Signup from "./pages/Signup";
import NoPage from "./pages/NoPage";
import './App.css'

const App = () => {
    return(
        <>
        <CssBaseline />
        <BrowserRouter>
        <NavBav />
        <ScrollTop showBelow={150}/>
            <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="home" element={<Home />}/>
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