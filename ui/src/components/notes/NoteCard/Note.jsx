import {Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import {LoadingButton} from "@mui/lab";
import {any, bool, func} from "prop-types";
import Button from "@mui/material/Button";
import styles from './NoteCard.module.scss'
import formatToReadbleDate from "../../../utils/formatToReadbleDate.js";

NoteCard.propTypes = {
    note: any,
    isDeleteLoading: bool,
    onDeleteClick: func,
    onEditClick:func
}

export default function NoteCard({note, isDeleteLoading, onDeleteClick,onEditClick}) {

    return (
        <Card className={styles['note-card']} variant="outlined" style={{margin: "10px 0px"}} sx={{minWidth: 275}}>
            <CardContent className={styles['note-info']}>
                <div className={styles['note-info__dates']}>
                    <Typography className={styles['note-info__updated__date']}>{formatToReadbleDate(note.updatedAt)}</Typography>
                </div>
                <Typography className={styles['note-info__title']} variant="h6" gutterBottom>
                    {note.title}
                </Typography>
                <Typography className={styles['note-info__description']} color="text.secondary" gutterBottom>
                    {note.description}
                </Typography>
            </CardContent>
            <CardActions className={styles['note-actions']}>
                <LoadingButton variant="outlined" loading={isDeleteLoading}
                               onClick={onDeleteClick}>Delete</LoadingButton>
                <Button onClick={onEditClick} variant="outlined">Edit</Button>
            </CardActions>
        </Card>
    )
}

