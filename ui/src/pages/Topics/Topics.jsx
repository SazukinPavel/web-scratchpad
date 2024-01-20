import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { showErrorSnackbar } from "../../store/slices/snackbar.js";
import styles from "./Topics.module.scss";
import { GetTopicsQuery } from "../../gql/queries/index.js";
import {
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { UpdateTopicMutation } from "../../gql/mutations/index.js";

export default function Main() {
  const [topics, setTopics] = useState([]);

  const [editedTopicId, setEditedTopicId] = useState(null);
  const [newTopicTitle, setNewTopicTitle] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    error: getError,
    data: getData,
    refetch: refetchTopics,
  } = useQuery(GetTopicsQuery);

  useEffect(() => {
    setTopics(getData?.topicsList || []);
  }, [getData]);

  useEffect(() => {
    const error = [getError, updateError].find((error) => error?.message);
    if (error?.message) {
      dispatch(showErrorSnackbar({ message: error.message }));
    }
  }, [getError]);

  const onTopicClick = (topic) => {
    if (!topic?.title) {
      return navigate("/notes");
    }
    navigate(`/notes?topic=${topic.title}`);
  };

  const onEditClick = (topic) => {
    setNewTopicTitle(topic.title);
    setEditedTopicId(topic.id);
  };

  const onCancelClick = () => {
    setEditedTopicId(null);
  };

  const onSaveClick = async () => {
    try {
      await updateTopicMutation({
        variables: { id: editedTopicId, title: newTopicTitle },
      });
    } finally {
      setEditedTopicId(null);
      refetchTopics();
    }
  };

  const [
    updateTopicMutation,
    { loading: isUpdateLoading, error: updateError },
  ] = useMutation(UpdateTopicMutation);

  return (
    <Container
      className={styles["topics-page"]}
      component="main"
      maxWidth="xxl"
      sx={{ marginTop: 2 }}
    >
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton>
          <ListItemText primary="All" />
          <ListItemIcon className={styles.all}>
            <IconButton onClick={() => onTopicClick()}>
              <ArrowForwardIcon />
            </IconButton>
          </ListItemIcon>
        </ListItemButton>

        {topics.map((topic) => (
          <ListItemButton key={topic.id}>
            {editedTopicId === topic.id ? (
              <TextField
                value={newTopicTitle}
                onInput={(e) => setNewTopicTitle(e.target.value)}
                margin="normal"
                required
                fullWidth
                size="small"
                id="title"
                autoFocus
              />
            ) : (
              <ListItemText primary={topic.title} />
            )}

            <ListItemIcon>
              {!editedTopicId ? (
                <>
                  <IconButton onClick={() => onEditClick(topic)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onTopicClick(topic)}>
                    <ArrowForwardIcon />
                  </IconButton>
                </>
              ) : (
                editedTopicId === topic.id && (
                  <>
                    <IconButton onClick={() => onCancelClick()}>
                      <CloseIcon />
                    </IconButton>
                    <IconButton onClick={onSaveClick}>
                      <SaveIcon />
                    </IconButton>
                  </>
                )
              )}
            </ListItemIcon>
          </ListItemButton>
        ))}
      </List>
    </Container>
  );
}
