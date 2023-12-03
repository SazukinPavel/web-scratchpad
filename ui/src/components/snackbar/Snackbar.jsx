import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch, useSelector} from "react-redux";
import {closeSnackbar} from "../../store/slices/snackbar.js";
import {Alert} from "@mui/material";

export default function AppSnackbar() {

    const {message,duration,isOpen,severity,position}=useSelector((state)=>state.snackbar)
    const dispatch=useDispatch()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(closeSnackbar())
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
            <Snackbar
                anchorOrigin={position}
                open={isOpen}
                autoHideDuration={duration}
                onClose={handleClose}
                message={message}
                action={action}
            >
                <Alert severity={severity}>{message}</Alert>
            </Snackbar>
    );
}