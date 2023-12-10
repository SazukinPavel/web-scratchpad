import {CircularProgress} from "@mui/material";
import styles from './Spinner.module.scss'

export default function Spinner() {

        return (
            <div className={styles['app-loading']}>
                <CircularProgress className={styles['app-loading__spinner']} variant="indeterminate"/>
            </div>
        )

}