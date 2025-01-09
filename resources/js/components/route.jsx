import React from "react";

import { Routes, Route } from "react-router-dom"; 
import Login from "./login"; 
import Register from "./register"; 
import Home from "./home"; 
// import Home from "./home"; 

function router() {
    return (
      
        <Routes>
           
           {/* Change this to Login  */}
            <Route path="/" element={<Login />} />
           
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} /> 
        </Routes>
    );
}

export default router;
