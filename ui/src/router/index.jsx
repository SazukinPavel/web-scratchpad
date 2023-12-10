import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import Login from "../pages/Login/index.js";
import Main from "../pages/Main/index.js";
import AddNote from "../pages/AddNote/index.js";
import ProtectedRoute from "./ProtectedRoute.jsx";
import EditNote from "../pages/EditNote/index.js";

export const rootRoute = {
    path: '/',
    element: <App/>,
    children: [
        {
            path: "login",
            element: <Login/>,
        },
        {
            path: "me",
            element: (<ProtectedRoute component={Main}/>),
        },
        {
            path: "notes/add",
            element: (<ProtectedRoute component={AddNote}/>),
        },
        {
            path: "notes/:id/edit",
            element: (<ProtectedRoute component={EditNote}/>),
        },
    ]
}

export default createBrowserRouter([
    rootRoute
]);
