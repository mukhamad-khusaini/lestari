import type { DataHeader, EditorOutput, ArticleData } from "../../../Interface";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../../styles/DraftContinue.module.css";
const DraftEditorSide = dynamic(() => import("../../../components/DraftEditorSide"), {
    ssr: false,
});
const Editor = dynamic(() => import("../../../components/Editor"), {
    ssr: false,
});

export default function DraftContinue() {
    const router = useRouter();
    // Set id
    const _id: any = useRef();
    if (!_id.current) {
        _id.current = router.query["draft_id"];
    }

    // State for auto save popup
    const [autoPop, setAutoPop] = useState({ display: "none" });

    // Handle popup
    const handleAutoPop = (display: { display: "none" | "block" }) => {
        setAutoPop(display);
    };

    // Article is save condition
    const [isSave, setIsSave] = useState(false);

    // Header Ref for auto save

    const headerDataAutoSave = useRef({
        title: "",
        author: "",
        category: "investasi",
    });

    const initialRef: any = useRef(false);

    useEffect(() => {
        if (initialRef.current) {
            const draft_id = router.query["draft_id"];
            const lestariDraft: any = window.localStorage.getItem("lestariDraft");
            let { draftList }: any = JSON.parse(lestariDraft);

            draftList.map((item: any) => {
                if (item._id === draft_id) {
                    headerDataAutoSave.current = {
                        title: item.title,
                        author: item.author,
                        category: item.category,
                    };
                }
            });
        } else {
            initialRef.current = true;
        }
    }, [initialRef.current]);

    // Auto-save state
    const autoSaveRef = useRef(false);

    // interval auto-saving
    let intervalSave: ReturnType<typeof setTimeout>;

    // Clear interval
    const handleClearInterval = () => {
        handleAutoPop({ display: "none" });
        clearTimeout(intervalSave);
        intervalSave = setTimeout(() => {
            handleAutoSaving(true);
            handleSave(true);
        }, 1000);
    };

    // Handle header callback auto save
    const handleHeaderCallbackAutoSave = (input: any) => {
        if (input.id === "title") {
            headerDataAutoSave.current.title = input.value;
        } else if (input.id === "author") {
            headerDataAutoSave.current.author = input.value;
        } else if (input.id === "category") {
            headerDataAutoSave.current.category = input.value;
        }
    };

    // Is save to database
    const saveRef: any = useRef(false);

    // Ref when get header callback return data
    const headData: any = useRef();

    // Handle auto-save
    const handleAutoSaving = (condition: boolean) => {
        autoSaveRef.current = condition;
    };

    // Handle Save condition
    const handleSave = (condition: boolean) => {
        setIsSave(condition);
    };

    // Handle Save database condition
    const handleSaveDatabase = (condition: boolean) => {
        saveRef.current = condition;
    };

    // Get header data a.k.a title, author, and category to publish
    const handleGetHeader = (dataHeader: DataHeader) => {
        headData.current = dataHeader;
        handleSave(true);
    };

    // Get header data a.k.a title, author, and category to save
    const handleGetHeaderSave = (dataHeader: DataHeader) => {
        headData.current = dataHeader;
        handleSaveDatabase(true);
        handleSave(true);
    };

    // Get data when saving data
    const handleSaveDraft = (data: EditorOutput) => {
        if (data.blocks.length === 0) {
            if (autoSaveRef.current) {
                handleAutoSaving(false);
                handleSave(false);
            } else {
                alert("Masukan Teks Artikel");
                handleAutoSaving(false);
                handleSave(false);
            }
        } else {
            const dataWelder: ArticleData = {
                _id: _id.current,
                ...headData.current,
                content: { ...data },
            };

            if (saveRef.current) {
                // **** Call API Callback to save data here! ****
                console.log("this is saving", dataWelder);
                // **** Call API Callback to save data here! ****

                // reset state
                handleSaveDatabase(false);
                handleSave(false);
                // reset state
            } else if (autoSaveRef.current) {
                const lestariDraft: any = window.localStorage.getItem("lestariDraft");
                const draftList: any = JSON.parse(lestariDraft);
                let index = draftList.draftList.findIndex((item: any) => item._id === _id.current);

                if (index === -1) {
                    if (!headerDataAutoSave.current.title) {
                        alert("Masukan Judul");
                    } else if (!headerDataAutoSave.current.author) {
                        alert("Masukan Author");
                    } else {
                        draftList.draftList.push({
                            _id: _id.current,
                            content: { ...data },
                            ...headerDataAutoSave.current,
                        });

                        window.localStorage.setItem("lestariDraft", JSON.stringify(draftList));
                    }

                    // reset state
                    handleAutoPop({ display: "block" });
                    handleAutoSaving(false);
                    handleSave(false);
                } else {
                    const draft_id = router.query["draft_id"];
                    const lestariDraft: any = window.localStorage.getItem("lestariDraft");
                    let draftList: any = JSON.parse(lestariDraft);

                    let index = draftList.draftList.findIndex((item: any) => item._id === draft_id);

                    draftList.draftList[index] = {
                        _id: _id.current,
                        content: { ...data },
                        ...headerDataAutoSave.current,
                    };
                    window.localStorage.setItem("lestariDraft", JSON.stringify(draftList));

                    // reset state
                    handleAutoPop({ display: "block" });
                    handleAutoSaving(false);
                    handleSave(false);
                }
            } else {
                // **** Call API Callback to publish data here! ****
                console.log("this is publish");
                // **** Call API Callback to publish data here! ****

                // reset state
                handleSave(false);
                handleSaveDatabase(false);
                // reset state
            }
        }
    };

    return (
        <>
            <Head>
                <title>Lestari | Draft Editor</title>
                <meta name="description" content="Gunakan halaman ini mengedit blog Lestari" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <DraftEditorSide
                    autoSave={handleHeaderCallbackAutoSave}
                    parentCallbackPublish={handleGetHeader}
                    parentCallbackSave={handleGetHeaderSave}
                />
                <div className={styles.editorContainer}>
                    <Editor onChange={handleClearInterval} onSave={isSave} parentCallback={handleSaveDraft} />
                </div>
                <p style={autoPop} className={styles.autoSaveNotif}>
                    Auto Saving ...
                </p>
            </main>
        </>
    );
}
