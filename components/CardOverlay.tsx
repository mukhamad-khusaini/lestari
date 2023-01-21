import { Card, Box, CardContent, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import type { CardOverlay } from "../Interface";

export default function CardOverlay(props: CardOverlay) {
    return (
        <Card variant="outlined" sx={{ display: "flex", width: 700, position: "relative" }}>
            <CardContent sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ display: "flex", flexDirection: "column", width: 300, paddingRight: 5 }}>
                    <Typography variant="subtitle2" component="h6">
                        Title
                    </Typography>
                    <Typography variant="body1" component="div">
                        {props.title}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="subtitle2" component="h6">
                        Date Created
                    </Typography>
                    <Typography variant="body1" component="div">
                        {props.date}
                    </Typography>
                </Box>
                {props.type === "delete" ? (
                    <Button
                        color="error"
                        onClick={() => props.handleDelete(props._id)}
                        sx={{ justifySelf: "end", position: "absolute", right: 20 }}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                ) : (
                    <Button
                        onClick={() => props.handleDownload(props._id)}
                        sx={{ justifySelf: "end", position: "absolute", right: 20 }}
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                    >
                        Download
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
