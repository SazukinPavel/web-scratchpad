import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { showErrorSnackbar } from "../../store/slices/snackbar.js";
import styles from './Notes.module.scss'
import NoteActionsMenu from "../../components/notes/ActionsMenu/index.js";
import NoteCard from "../../components/notes/NoteCard/Note.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { GetNotesQuery } from "../../gql/queries/index.js";
import { DeleteNoteMutation } from "../../gql/mutations/index.js";

export default function Main() {

    const [notes, setNotes] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const { loading: getLoading, error: getError, data: getData, refetch: refetchNotes, } = useQuery(GetNotesQuery, {
        variables: {
            topic: new URLSearchParams(location.search).get('topic')
        }
    });

    const [deleteNoteMutation, { loading: deleteLoading, error: deleteError }] = useMutation(DeleteNoteMutation);


    useEffect(() => {
        setNotes(getData?.notesList || [])
    }, [getData]);

    useEffect(() => {
        const error = [deleteError, getError].find(error => error?.message)
        if (error?.message) {
            dispatch(showErrorSnackbar({ message: error.message }))
        }
    }, [deleteError, getError]);

    const onDeleteClick = async (id) => {
        await deleteNoteMutation({ variables: { id } })
        refetchNotes()
    }

    const onEditClick = async (id) => {
        navigate(`/notes/${id}/edit`)
    }

    return (
        <Container className={styles['notes-page']} component="main" maxWidth="xxl" sx={{ marginTop: 2 }}>
            {
                notes.map((note) =>
                    <NoteCard key={note.id} note={note} isDeleteLoading={deleteLoading}
                        onEditClick={() => onEditClick(note.id)} onDeleteClick={() => onDeleteClick(note.id)} />
                )
            }
            <NoteActionsMenu />
        </Container>
    );
}