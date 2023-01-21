import * as React from "react";
import type { DialogTitleProps, ModalBox, DraftList } from "../Interface";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CardOverlay from "./CardOverlay";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(3),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: "red",
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

export default function ModalBox(props: ModalBox) {
    const handleDelete = (_id: string) => props.handleDelete(_id);
    const handleDownload = (_id: string) => props.handleDownload(_id);

    return (
        <div>
            <BootstrapDialog
                scroll="body"
                maxWidth="xl"
                onClose={props.handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleClose}>
                    {props.title}
                </BootstrapDialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }} dividers>
                    {props.draftList.map((item) => {
                        let date = new Date(item.content.time);
                        return (
                            <CardOverlay
                                handleDelete={handleDelete}
                                handleDownload={handleDownload}
                                type="delete"
                                key={item._id}
                                title={item.title}
                                _id={item._id}
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
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}
