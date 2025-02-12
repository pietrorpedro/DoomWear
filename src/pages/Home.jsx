import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useCategory } from "../contexts/CategoryContext";

export default function Home() {

    const {getCategories} = useCategory();

    useEffect(() => {
        async function get() {
            const res = await getCategories();
            console.log(res)
        }
        get();
    }, [])

    return (
        <Box>
            <Typography variant="h4">Novidades!</Typography>
        </Box>
    )
}