import { ReactEventHandler } from "react";

// This is for editor component
export interface EditorProps {
    onSave: any;
    previousData?: any;
    parentCallback: any;
    onChange?: any;
}

// This is for draft list component
export interface DraftList {
    draftList: ArticleData[];
}

// This is for button component
export interface Button {
    variant?: string;
    children: any;
    color?: "white" | "default";
    onClick?: ReactEventHandler;
}

// This is for draft card component
export interface DraftCards<T> {
    title: string;
    date: T;
    editId: string;
    keyID?: any;
}

// This is for draft editor side component
export interface DraftEditorSideProps {
    parentCallbackPublish: any;
    parentCallbackSave: any;
    autoSave?: any;
    onLoad?: any;
}

// This is for data header
export interface DataHeader {
    title: string;
    author: string;
    category: string;
}

// This is for Editor output
export interface EditorOutput {
    time: number;
    blocks: any;
    version: string;
}

// This is for article data
export interface ArticleData {
    _id: string;
    title: string;
    author: string;
    content: EditorOutput;
    category: string;
}

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

export interface ModalBox {
    title: string;
    handleClose: () => void;
    open: boolean;
    draftList: ArticleData[];
    handleDelete?: any;
    handleDownload?: any;
}

export interface CardOverlay {
    _id: string;
    title: string;
    date: string | number;
    type: "delete" | "download";
    handleDelete?: any;
    handleDownload?: any;
}
