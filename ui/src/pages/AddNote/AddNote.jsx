import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showErrorSnackbar } from "../../store/slices/snackbar.js";
import NoteForm from "../../components/notes/NoteForm/index.js";
import { GetNotesQuery } from "../../gql/queries/index.js";
import { AddNoteMutation } from "../../gql/mutations/index.js";

export default function AddNote() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [addNoteMutation, { loading: isAddLoading, error: addError }] =
    useMutation(AddNoteMutation);
  const { refetch } = useQuery(GetNotesQuery);
  const handleSubmit = async (dto) => {
    await addNoteMutation({ variables: { ...dto } });
    refetch();
    navigate(-1);
  };

  useEffect(() => {
    if (addError?.message) {
      dispatch(showErrorSnackbar({ message: addError.message }));
    }
  }, [addError]);

  return (
    <Container component="main" maxWidth="xs">
      <NoteForm
        title="Add new note"
        onSubmit={handleSubmit}
        btn={{ isLoading: isAddLoading, title: "Add" }}
      />
    </Container>
  );
}
