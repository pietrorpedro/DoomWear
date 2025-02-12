import { Box, Paper, Typography } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {

    const {user} = useAuth();

    return (
        <Box sx={{
            padding: 1,
        }}>
            <Paper>
                <Typography variant="h5">Olá, {user.user_metadata.full_name.split(" ")[0]}</Typography>
            </Paper>
        </Box>
    )
}