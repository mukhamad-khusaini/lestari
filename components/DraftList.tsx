import type { DraftList } from "../Interface";
import Image from "next/image";
import styles from "../styles/DraftList.module.css";
import Button from "./Button";
import DraftCard from "./DraftCard";
import defaultDraftValue from "./utils/DefaultDraft";

export default function DraftList() {
    // set default draft if nothing in local storage
    if (!window.localStorage.getItem("lestariDraft")) {
        window.localStorage.setItem("lestariDraft", JSON.stringify(defaultDraftValue));
    }

    // get local draft
    const localDraft: any = window.localStorage.getItem("lestariDraft");
    const { draftList }: DraftList = JSON.parse(localDraft);

    // Get formated date

    // if empty
    if (draftList.length === 0) {
        return (
            <div className={styles.emptyContainer}>
                <Image priority style={{ opacity: 0.3 }} alt="empty image" width={200} height={200} src="/images/empty.png" />
                <p className={styles.nothing}>There are no drafts in your local storage</p>
                <div className={styles.buttonContainer}>
                    <Button variant="contained">Create Draft</Button>
                    <Button variant="outlined">Download Draft</Button>
                </div>
            </div>
        );
    }

    // if available
    return (
        <div className={styles.draftContainer}>
            <h1>Draft on your local storage</h1>
            <hr />
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
    );
}
