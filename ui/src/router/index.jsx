import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import Login from "../pages/Login/index.js";
import Notes from "../pages/Notes/index.js";
import Topics from "../pages/Topics/index.js";
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
            path: "",
            element: (<ProtectedRoute component={Topics}/>),
        },
        {
            path: "notes",
            element: (<ProtectedRoute component={Notes}/>),
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
