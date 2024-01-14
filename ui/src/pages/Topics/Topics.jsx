import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { showErrorSnackbar } from "../../store/slices/snackbar.js";
import styles from './Topics.module.scss'
import { GetTopicsQuery } from "../../gql/queries/index.js";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Main() {

    const [topics, setTopics] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { error: getError, data: getData } = useQuery(GetTopicsQuery);

    useEffect(() => {
        setTopics(getData?.topicsList || [])
    }, [getData]);

    useEffect(() => {
        const error = [getError].find(error => error?.message)
        if (error?.message) {
            dispatch(showErrorSnackbar({ message: error.message }))
        }
    }, [getError]);

    const onTopicClick = (topic) => {
        if (!topic?.title) {
            return navigate('/notes')
        }
        navigate(`/notes?topic=${topic.title}`)
    }

    return (
        <Container className={styles['topics-page']} component="main" maxWidth="xxl" sx={{ marginTop: 2 }}>
            <List component="nav" aria-label="secondary mailbox folder">
                <ListItemButton onClick={onTopicClick}
                >
                    <ListItemText primary="All" />
                </ListItemButton>


                {
                    topics.map(topic => <ListItemButton key={topic.id} onClick={() => onTopicClick(topic)}
                    >
                        <ListItemText primary={topic.title} />
                    </ListItemButton>)
                }
            </List>
        </Container>
    );
}