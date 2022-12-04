import React from "react";
import { Routes, Route } from "react-router-dom";
import CssBaseline  from "@mui/material/CssBaseline";
import NavBav from "../components/NavBav";
import ScrollTop from "../components/ScrollTop";
import Top from "../components/AutoScrollTop";


import Home from "./Home";
import Library from "./Library";
import Login from "./Login";
import Profile from "./Profile";
import Reports from "./Reports";
import Signup from "./Signup";
import NoPage from "./NoPage";
import Minigame from "./Minigame";


const NavPages = () => {
    const [token, setToken] = React.useState("")

    return(
        <>
        <CssBaseline />
        <Top/>
        <NavBav token={token} setToken={setToken}/>
        <ScrollTop showBelow={150}/>
        <Routes>
            <Route index element={<Home />} /> 
            <Route path="home" element={<Home />}/>
            <Route path="library" element={<Library />} />
            <Route path="reports" element={<Reports />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login setToken={setToken}/>} />
            <Route path="profile" element={<Profile />} />
            <Route path="minigame" element={<Minigame />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
        </>
    );
}

export default NavPages;