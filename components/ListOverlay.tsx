import styles from "../styles/ListOverlay.module.css";
import CloseIcon from "@mui/icons-material/Close";
import type { DraftList } from "../Interface";
import DraftCard from "./DraftCard";

export default function ListOverlay() {
    // get local draft
    const localDraft: any = window.localStorage.getItem("lestariDraft");
    const { draftList }: DraftList = JSON.parse(localDraft);

    if (draftList.length === 0) {
        return <div></div>;
    }

    return (
        <div className={styles.listOverlay}>
            <div className={styles.heading}>
                <h2>Draft Delete</h2>
                <div className={styles.iconContainer}>
                    <CloseIcon fontSize="medium" color="error" />
                </div>
            </div>
            <div className={styles.draftListContainer}>
                {draftList.map((item) => {
                    let date = new Date(item.content.time);
                    return (
                        <DraftCard
                            key={item._id}
                            editId={item._id}
                            title={item.title}
                            date={date.toLocaleString("id", {
                                year: "numeric",
                                month: "long",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        />
                    );
                })}
            </div>
        </div>
    );
}
