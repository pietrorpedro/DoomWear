import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ id, name, price, inStock }) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/details/${id}`)
    }

    return (
        <Card
            onClick={handleClick}
            sx={{
                width: "100%",
                maxWidth: 300,
                height: 300,
                display: "flex",
                flexDirection: "column",
                cursor: "pointer"
            }}>
            <CardMedia
                component="img"
                sx={{ height: 150, objectFit: "cover" }}
                image="https://placehold.co/250x150"
            />
            <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box>
                    {!inStock && (
                        <Typography variant="body1" color="error" textAlign="center">
                            <b>ESGOTADO!</b>
                        </Typography>
                    )}
                    <Typography variant="h6" color={!inStock ? "textDisabled" : "textPrimary"} textAlign="center">
                        {name}
                    </Typography>
                </Box>
                <Typography variant="body1" color={!inStock ? "textDisabled" : "textPrimary"} textAlign="center">
                    R$ {price}
                </Typography>
            </CardContent>
        </Card>
    );
}
