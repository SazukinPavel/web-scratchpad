import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {LoadingButton} from "@mui/lab";
import {any, bool, func, shape, string} from "prop-types";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

NoteForm.propTypes = {
    data: any,
    title: string,
    btn: shape({
        title: string,
        isLoading: bool
    }),
    onSubmit: func
}

export default function NoteForm({data, btn, title, onSubmit}) {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({title: "", description: ""})

    const setValue = (key, value) => {
        setFormData({...formData, [key]: value})
    }

    const onCancelClick = () => {
        navigate('/me')
    }

    useEffect(() => {
        setFormData({...formData, ...data})
    }, [data])

    return (
        <Box
            sx={{
                marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">
                {title}
            </Typography>
            <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{mt: 1}}>
                <TextField
                    value={formData.title}
                    onInput={(e) => setValue('title', e.target.value)}
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
                    autoFocus
                />
                <TextField
                    value={formData.description}
                    onInput={(e) => setValue('description', e.target.value)}
                    margin="normal"
                    fullWidth
                    multiline
                    minRows={5}
                    name="description"
                    label="Description"
                    type="description"
                    id="description"
                    autoComplete="description"
                />
                <Box
                    sx={{mt: 3, mb: 2, justifyContent: "end", display: "flex"}}
                >
                    <Button
                        sx={{mr: 2}}
                        variant="contained"
                        onClick={onCancelClick}>Cancel</Button>
                    <LoadingButton
                        type="submit"
                        onClick={() => onSubmit(formData)}
                        variant="contained"
                        loading={btn.isLoading}
                    >
                        {btn.title}
                    </LoadingButton>
                </Box>

            </Box>
        </Box>
    )
}

