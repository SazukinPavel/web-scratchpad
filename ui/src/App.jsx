import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {rootRoute} from "./router";
import {useDispatch, useSelector} from "react-redux";
import api from "./api.js";
import AppSnackbar from "./components/snackbar";
import {setAuthData} from "./store/slices/auth.js";
import {Skeleton} from "@mui/material";


function App() {

    const [isAuthLoading, setIsAuthLoading] = useState(true)

    const {isAuthorized} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthLoading) {
            return
        }

        const path = location.pathname?.slice(1)
        const currentRoute = rootRoute.children.find(c => c.path === path)

        if (!currentRoute) {
            navigate('/login')
        }

        if (currentRoute.meta.role && !isAuthorized) {
            navigate('/login')
        } else if (!currentRoute.meta.role && isAuthorized) {
            navigate('/me')
        }
    }, [location, isAuthLoading]);

    const tryAuthorization = async () => {
        try {
            setIsAuthLoading(true)
            const data = await api.auth.me()
            dispatch(setAuthData(data))
        } finally {
            setIsAuthLoading(false)
        }
    }

    useEffect(() => {
        tryAuthorization()
    }, [])


    if (isAuthLoading) {
        return <Skeleton
            sx={{bgcolor: 'grey.900'}}
            variant="rectangular"
            width="100vw"
            height="100vh"
        />
    }

    return (
        <>
            <AppSnackbar/>
            <Outlet/>
        </>
    )
}

export default App
