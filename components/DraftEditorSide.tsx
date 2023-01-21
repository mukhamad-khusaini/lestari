import { useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import type { DraftEditorSideProps } from "../Interface";
import styles from "../styles/DraftEditorSide.module.css";
import Image from "next/image";
import Logo from "../public/images/logo.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "./Button";
import process from "process";

export default function DraftEditorSide(props: DraftEditorSideProps) {
    const formRef: any = useRef();
    const router = useRouter();
    const headerRef: any = useRef({
        title: "",
        author: "",
        category: "investasi",
    });

    if (router.query["draft_id"]) {
        const draft_id = router.query["draft_id"];
        const lestariDraft: any = window.localStorage.getItem("lestariDraft");
        let { draftList }: any = JSON.parse(lestariDraft);

        draftList.map((item: any) => {
            if (item._id === draft_id) {
                headerRef.current = {
                    title: item.title,
                    author: item.author,
                    category: item.category,
                };
            }
        });
    }

    const handlePublish = () => {
        if (formRef.current["title"].value === "") {
            alert("Masukan judul");
        } else if (formRef.current["author"].value === "") {
            alert("Masukan author");
        } else {
            props.parentCallbackPublish({
                title: formRef.current["title"].value,
                author: formRef.current["author"].value,
                category: formRef.current["category"].value,
            });
        }
    };

    const handleSave = () => {
        if (formRef.current["title"].value === "") {
            alert("Masukan judul");
        } else if (formRef.current["author"].value === "") {
            alert("Masukan author");
        } else {
            props.parentCallbackSave({
                title: formRef.current["title"].value,
                author: formRef.current["author"].value,
                category: formRef.current["category"].value,
            });
        }
    };

    return (
        <div className={styles.draftSide}>
            <div className={styles.imageContainer}>
                <Link href={"/editor"}>
                    <div className={styles.iconContainer}>
                        <ArrowBackIcon fontSize="medium" color="success" />
                    </div>
                </Link>
                <Image width={180} height={64} alt="lestari-logo" src="/images/logo.png" priority />
            </div>
            <form className={styles.form} ref={formRef} onClick={(e) => e.preventDefault}>
                <div className={styles.inputGroup}>
                    <label htmlFor="title">Title</label>
                    <input
                        onChange={(e) => {
                            props.autoSave(e.target);
                        }}
                        type="text"
                        id="title"
                        defaultValue={headerRef.current.title}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="author">Author</label>
                    <input
                        onChange={(e) => {
                            props.autoSave(e.target);
                        }}
                        type="text"
                        id="author"
                        defaultValue={headerRef.current.author}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="category">Category</label>
                    <select
                        onChange={(e) => {
                            props.autoSave(e.target);
                        }}
                        name="catagory"
                        id="category"
                        defaultValue={headerRef.current.category}
                    >
                        <option value="investasi">Investasi</option>
                        <option value="green">Green</option>
                    </select>
                </div>
                <div className={styles.buttonGroup}>
                    <Button onClick={handlePublish} color="white" variant="contained">
                        Publish
                    </Button>
                    <Button onClick={handleSave} color="white" variant="outlined">
                        Save to Database
                    </Button>
                </div>
            </form>
        </div>
    );
}
