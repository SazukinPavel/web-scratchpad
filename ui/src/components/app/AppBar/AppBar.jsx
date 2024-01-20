import AppBarMUI from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../../store/slices/auth";
import api from "../../../api";

export default function AppBar({ children }) {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onLogoutClick = async () => {
    dispatch(logout());
    await api.auth.logout();
  };

  return (
    <AppBarMUI position="static">
      <Toolbar>
        <Typography
          align="right"
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          {user.username}
        </Typography>
        <IconButton
          onClick={onLogoutClick}
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mx: 1 }}
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBarMUI>
  );
}
