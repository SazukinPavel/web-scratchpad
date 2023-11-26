import {createBrowserRouter} from "react-router-dom";
import React from "react";
import Login from "../pages/Login.jsx";

export  default createBrowserRouter([
    {
        path: "/",
        element:<Login/>,
    },
]);
