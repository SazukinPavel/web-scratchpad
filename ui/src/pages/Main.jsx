import {useEffect, useState} from "react";
import Container from '@mui/material/Container';
import {Card, CardActions, CardContent} from "@mui/material";
import {useQuery} from "@apollo/client";
import {useDispatch, useSelector} from "react-redux";
import {GetNotes} from "../gql/queries/index.js";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {showErrorSnackbar} from "../store/slices/snackbar.js";

export default function Main() {

    const [notes, setNotes] = useState([])

    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()

    const {loading, error, data} = useQuery(GetNotes, {
        context: {
            headers: {
                authorization: `Bearer ${
                    token
                }`,
            },
        },
    });

    useEffect(() => {
        setNotes(data?.list || [])
    }, [data]);

    useEffect(() => {
        if (error?.message) {
            dispatch(showErrorSnackbar({message: error.message}))
        }
    }, [error]);

    return (
        <Container component="main" maxWidth="lg" sx={{marginTop: 2}}>
            {
                notes.map((n) =>
                    <Card variant="outlined" style={{margin: "10px 0px"}} key={n.id} sx={{minWidth: 275}}>
                        <CardContent>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                {n.title}
                            </Typography>

                            <Typography color="text.secondary" gutterBottom>
                                {n.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                )
            }
        </Container>
    );
}