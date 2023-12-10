import Container from "@mui/material/Container";
import { useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import { showErrorSnackbar} from "../../store/slices/snackbar.js";
import NoteForm from "../../components/notes/NoteForm/index.js";
import { UpdateNoteMutation} from "../../gql/mutations/index.js";
import Spinner from "../../components/Spinner/index.js";
import {GetNotesQuery, OneNoteQuery} from "../../gql/queries/index.js";

export default function EditNote() {
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()

    const [oldNote,setOldNote]=useState({})
    const {data:getNoteData,error:getError,loading:isGetLoading}=useQuery(OneNoteQuery,{variables:{id}})
    const {refetch:refetchNotes}=useQuery(GetNotesQuery)
    const [updateNoteMutation, { loading:isUpdateLoading, error:updateError }] = useMutation(UpdateNoteMutation);
    const handleSubmit = async (dto) => {
        await updateNoteMutation({variables:{...dto}})
        refetchNotes()
        navigate('/me')
    };

    useEffect(() => {
        if(updateError?.message){
            dispatch(showErrorSnackbar({message:updateError.message}))
        }
    }, [updateError]);

    useEffect(() => {
       setOldNote(getNoteData.one)
    }, [getNoteData]);


    useEffect(()=>{
        if(getError?.message){
            dispatch(showErrorSnackbar({message:getError.message}))
            navigate('/me')
        }
    },[getError])

    if(isGetLoading){
        return <Spinner/>
    }

    return (
        <Container component="main" maxWidth="xs">
            <NoteForm data={oldNote} title="Edit note" onSubmit={handleSubmit} btn={{isLoading:isUpdateLoading,title:'Save'}}/>
        </Container>
    );
}