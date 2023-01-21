import { useState } from "react";
import type { DraftList } from "../Interface";
import styles from "../styles/SideEditor.module.css";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import dynamic from "next/dynamic";
import defaultDraftValue from "./utils/DefaultDraft";
const ModalBox = dynamic(() => import("./ModalBox"), {
    ssr: false,
});

export default function SideEditor() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = (_id: string) => {
        // Here do delete data
        if (confirm("Yakin ingin menghapus artikel ini ? \nTindakan ini tidak dapat dipulihkan")) {
            console.log(_id);
        }
    };

    if (!window.localStorage.getItem("lestariDraft")) {
        window.localStorage.setItem("lestariDraft", JSON.stringify(defaultDraftValue));
    }

    const localDraft: any = window.localStorage.getItem("lestariDraft");
    const { draftList }: DraftList = JSON.parse(localDraft);

    return (
        <div className={styles.side}>
            {/* Add action */}
            <div className={styles.actionContainer}>
                <Link href={"/editor/draft-editor"}>
                    <div className={styles.action}>
                        <AddIcon fontSize="large" color="success" />
                    </div>
                </Link>
            </div>

            {/* Delete action */}
            <div className={styles.actionContainer}>
                <div onClick={handleOpen} className={styles.action}>
                    <DeleteForeverIcon fontSize="medium" color="success" />
                </div>
            </div>
            <ModalBox handleDelete={handleDelete} draftList={draftList} open={open} handleClose={handleClose} title="Hapus Draft" />
        </div>
    );
}
