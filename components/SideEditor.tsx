import styles from "../styles/SideEditor.module.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import dynamic from "next/dynamic";
// const ListOverlay = dynamic(() => import("./ListOverlay"), {
//     ssr: false,
// });

export default function SideEditor() {
    return (
        <div className={styles.side}>
            {/* Add action */}
            <div className={styles.actionContainer}>
                <a href="/editor/draft-editor">
                    <div className={styles.action}>
                        <AddIcon fontSize="large" color="success" />
                    </div>
                </a>
            </div>

            {/* Delete action */}
            <div className={styles.actionContainer}>
                <div className={styles.action}>
                    <DeleteForeverIcon fontSize="medium" color="success" />
                </div>
            </div>
            {/* <ListOverlay /> */}
        </div>
    );
}
