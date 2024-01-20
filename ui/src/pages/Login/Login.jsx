import TextField from "@mui/material/TextField";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setAuthData } from "../../store/slices/auth.js";
import { useNavigate } from "react-router-dom";
import api from "../../api.js";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { showErrorSnackbar } from "../../store/slices/snackbar.js";

export default function SignIn() {
  const { isAuthorized } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dto = {
      username: data.get("username"),
      password: data.get("password"),
    };
    try {
      setIsLoginLoading(true);
      const data = await api.auth.login(dto);
      dispatch(setAuthData(data));
    } catch (e) {
      dispatch(showErrorSnackbar({ message: e.response.data.message }));
    } finally {
      setIsLoginLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      navigate(-1);
    }
  }, [isAuthorized]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/*<FormControlLabel*/}
          {/*    control={<Checkbox value="remember" color="primary"/>}*/}
          {/*    label="Remember me"*/}
          {/*/>*/}
          <LoadingButton
            loading={isLoginLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
          {/*<Grid container>*/}
          {/*    <Grid item xs>*/}
          {/*        <Link href="#" variant="body2">*/}
          {/*            Forgot password?*/}
          {/*        </Link>*/}
          {/*    </Grid>*/}
          {/*    <Grid item>*/}
          {/*        <Link href="#" variant="body2">*/}
          {/*            {"Don't have an account? Sign Up"}*/}
          {/*        </Link>*/}
          {/*    </Grid>*/}
          {/*</Grid>*/}
        </Box>
      </Box>
    </Container>
  );
}
