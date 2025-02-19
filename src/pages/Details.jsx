import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";
import { getProduct } from "../services/ProductService";
import { insertProduct } from "../services/ShoppingCartService";

export default function Details() {

    const { id } = useParams();
    const {user} = useAuth();
    const { loading } = useLoading();

    const [product, setProduct] = useState(null);

    const navigate = useNavigate();


    useEffect(() => {
        const fetchDetails = async () => {
            const res = await getProduct(id);
            setProduct(res[0]);
            console.log(res[0].id)
        }

        fetchDetails();
    }, [id])

    const handleAddCart = async () => {
        if (!user) {
            navigate("/auth");
            return;
        }
        await insertProduct(user.id, product.id, 1);
    };

    if (loading || !product) return <></>;

    return (
        <Box sx={{
            padding: 1,
        }}>
            <Box sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                placeItems: { xs: "center", md: "start" },
                gap: 2,
                maxWidth: 1200,
                margin: "0 auto",
            }}>
                <img
                    src="https://placehold.co/600x400"
                    style={{
                        width: "100%",
                        maxWidth: 700
                    }}
                />

                <Box sx={{
                    width: "100%",
                    maxWidth: 700,
                    height: "100%",
                    position: "relative"
                }}>
                    <Typography variant="h5" color="error"><b>{product.stock_qty == 0 ? "Esgotado" : ""}</b></Typography>
                    <Typography variant="h4">{product.name}</Typography>
                    <Typography variant="body1">{product.description}</Typography>
                    <Typography variant="h5" marginTop={2}><b>R$ {product.price}</b></Typography>
                    <Button
                        fullWidth
                        variant="contained"
                        disabled={product.stock_qty == 0}
                        onClick={handleAddCart}
                        sx={{
                            position: {md: "absolute"},
                            bottom: 0,
                            marginTop: 3
                        }}
                    >
                        Adicionar ao Carrinho
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}