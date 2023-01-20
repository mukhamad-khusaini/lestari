import type { DraftList } from "../Interface";
import { useRouter } from "next/router";
import { createReactEditorJS } from "react-editor-js";
import { useCallback, useRef } from "react";
import Tools from "./utils/EditorTools";
import { EditorProps } from "../Interface";
import defaultDraftValue from "./utils/DefaultDraft";

const ReactEditor = createReactEditorJS();

export default function Editor(props: EditorProps) {
    const router = useRouter();
    const artic: any = useRef();
    if (router.query["draft_id"]) {
        const draft_id = router.query["draft_id"];
        const lestariDraft: any = window.localStorage.getItem("lestariDraft");
        let { draftList }: any = JSON.parse(lestariDraft);

        draftList.map((item: any) => {
            if (item._id === draft_id) {
                artic.current = item.content;
            }
        });
    }

    const editorRef: any = useRef(null);

    const localDraft: any = window.localStorage.getItem("lestariDraft");

    // Set initial empty draft for browser local storage
    if (!localDraft) {
        window.localStorage.setItem("lestariDraft", JSON.stringify(defaultDraftValue));
    }

    // Only god know what is this for :v
    // const { draftList }: DraftList = JSON.parse(localDraft);

    // handle initial render of editor
    const handleInitialize = useCallback((instance: any) => {
        editorRef.current = instance;
    }, []);

    const handleSave = useCallback(async () => {
        const data = await editorRef.current.save();
        // window.localStorage.setItem("lestariDraft", JSON.stringify(data));
        // console.log(window.localStorage.getItem("lestariDraft"));
        props.parentCallback(data);
    }, []);

    if (props.onSave === true) {
        handleSave();
    }

    if (props.previousData) {
        let data = JSON.parse(localDraft);
        return <ReactEditor defaultValue={data} placeholder="Add some text here..." tools={Tools} onInitialize={handleInitialize} />;
    }

    return (
        <ReactEditor
            defaultValue={artic.current}
            onChange={props.onChange}
            placeholder="Add some text here..."
            tools={Tools}
            onInitialize={handleInitialize}
        />
    );
}
