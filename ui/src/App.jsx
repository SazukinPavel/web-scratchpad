import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "./api.js";
import AppSnackbar from "./components/app/AppSnackbar";
import { setAuthData } from "./store/slices/auth.js";
import { showSuccessSnackbar } from "./store/slices/snackbar.js";
import Spinner from "./components/Spinner/index.js";
import AppBar from "./components/app/AppBar/AppBar.jsx";

function App() {
  const [isAuthorizedLoading, setIsAuthorizedLoading] = useState(true);

  const { user, token, isAuthorized } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const tryAuthorization = async () => {
    try {
      setIsAuthorizedLoading(true);
      const data = await api.auth.me();
      dispatch(setAuthData(data));
    } finally {
      setIsAuthorizedLoading(false);
    }
  };

  useEffect(() => {
    tryAuthorization();
  }, []);

  useEffect(() => {
    if (user?.username) {
      dispatch(showSuccessSnackbar({ message: "Welcome " + user.username }));
    }
  }, [user]);

  if (isAuthorizedLoading || (isAuthorized && !token)) {
    return <Spinner />;
  }

  return (
    <AppSnackbar>
      {isAuthorized && <AppBar />}
      <Outlet />
    </AppSnackbar>
  );
}

export default App;
