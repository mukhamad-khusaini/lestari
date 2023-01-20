import styles from "../styles/DraftCard.module.css";
import Edit from "@mui/icons-material/EditOutlined";
import { DraftCards } from "../Interface";

export default function DraftCard(props: DraftCards<string | number>) {
    return (
        <div key={props.keyID} className={styles.card}>
            <div className={styles.title}>
                <h2>Title</h2>
                <h1>{props.title}</h1>
            </div>
            <div className={styles.date}>
                <h2>Date Created</h2>
                <h1>{props.date}</h1>
            </div>
            <div className={styles.icon}>
                <a href={"/editor/draft-editor/" + props.editId}>
                    <Edit sx={{ color: "white" }} color="info" fontSize="medium" />
                </a>
            </div>
        </div>
    );
}
