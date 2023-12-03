import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login.jsx";
import Main from "../pages/Main.jsx";
import App from "../App.jsx";

export const rootRoute = {
    path: '/',
    element: <App/>,
    children: [
        {
            path: "login",
            element: <Login/>,
            meta: {}
        },
        {
            path: "me",
            element: <Main/>,
            meta: {role: 1}
        },
    ]
}

export default createBrowserRouter([
    rootRoute
]);
